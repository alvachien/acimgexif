using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using acimgexif;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.Extensions.Logging;
using ImageMagick;

namespace acimgexif
{
    public class FileUploadResult
    {
        public String FileUrl { get; set; }
        public String ThumbnailFileUrl { get; set; }
        public String FileFormat { get; set; }
        public DateTime UploadedTime { get; set; }
        public String OrgFileName { get; set; }

        public List<ExifTagItem> ExifTags = new List<ExifTagItem>();
    }

    [Route("api/[controller]")]
    public class ImageFileController : Controller
    {
        private IHostingEnvironment _hostingEnvironment;
        private readonly ILogger<ImageFileController> _logger;


        public ImageFileController(IHostingEnvironment env, ILogger<ImageFileController> logger)
        {
            _hostingEnvironment = env;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Index(ICollection<IFormFile> files)
        {
            var uploads = Path.Combine(_hostingEnvironment.ContentRootPath, "wwwroot/uploads");
            if (!Directory.Exists(uploads))
            {
                Directory.CreateDirectory(uploads);
            }
            List<FileUploadResult> listResults = new List<FileUploadResult>();

            if (files.Count > 0)
            {
                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        await AnalyzeFile(file, uploads, listResults);
                    }
                }
            }
            else if (Request.Form.Files.Count > 0)
            {
                foreach (var file in Request.Form.Files)
                {
                    if (file.Length > 0)
                    {
                        await AnalyzeFile(file, uploads, listResults);
                    }
                }
            }

            return new ObjectResult(listResults);
        }

        private async Task<IActionResult> AnalyzeFile(IFormFile ffile, String uploads, List<FileUploadResult> listResults)
        {
            var nid = Guid.NewGuid();
            String nfilename = nid.ToString("N") + ".jpg";
            String nthumbfilename = nid.ToString("N") + ".thumb.jpg";
            System.Diagnostics.Debug.WriteLine("Target file: {0}", nfilename);

            var rst = new FileUploadResult
            {
                FileUrl = "/uploads/" + nfilename,
                ThumbnailFileUrl = "/uploads/" + nthumbfilename,
                OrgFileName = ffile.FileName,
                UploadedTime = DateTime.Now
            };

            using (var fileStream = new FileStream(Path.Combine(uploads, nfilename), FileMode.Create))
            {
                await ffile.CopyToAsync(fileStream);

                ExifToolWrapper wrap = new ExifToolWrapper();
                wrap.Run(Path.Combine(uploads, nfilename));
                
                foreach (var item in wrap)
                {
                    System.Diagnostics.Debug.WriteLine("{0}, {1}, {2}", item.group, item.name, item.value);
                    rst.ExifTags.Add(item);
                }
                listResults.Add(rst);

                try
                {
                    using (MagickImage image = new MagickImage(Path.Combine(uploads, nfilename)))
                    {
                        // Retrieve the exif information
                        ExifProfile profile = image.GetExifProfile();
                        Boolean bThumbnailCreated = false;
                        if (profile != null)
                        {
                            using (MagickImage thumbnail = profile.CreateThumbnail())
                            {
                                // Check if exif profile contains thumbnail and save it
                                if (thumbnail != null)
                                {
                                    thumbnail.Write(Path.Combine(uploads, nthumbfilename));
                                    bThumbnailCreated = true;
                                }
                            }
                        }

                        if (!bThumbnailCreated)
                        {
                            MagickGeometry size = new MagickGeometry(300, 300);
                            // This will resize the image to a fixed size without maintaining the aspect ratio.
                            // Normally an image will be resized to fit inside the specified size.
                            size.IgnoreAspectRatio = true;

                            image.Resize(size);

                            // Save the result
                            image.Write(Path.Combine(uploads, nthumbfilename));
                        }
                    }
                }
                catch(Exception exp)
                {
                    System.Diagnostics.Debug.WriteLine(exp.Message);
                }
            }

            return Json(true);
        }
    }
}
