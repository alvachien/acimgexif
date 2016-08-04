import { Component, OnInit } from '@angular/core';
import { NGB_DIRECTIVES, NGB_PRECOMPILE }   from '@ng-bootstrap/ng-bootstrap';
import { ImageFileService } from './imagefile.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/views/main.html',
    directives: [
        NGB_DIRECTIVES
    ],
    precompile: [NGB_PRECOMPILE],
    providers: [ImageFileService]
})

export class AppComponent implements OnInit {
    public selectedFiles: any;
    public service: ImageFileService;
    public uploadProgress: number;
    public uploadResult: Array<any>;

    constructor(
        private psservice: ImageFileService) {
        this.service = psservice;

        this.service.progress$.subscribe(
            data => {
                console.log('progress = ' + data);
                this.uploadProgress = parseInt(data);
            });
    }

    ngOnInit() {
    }

    onChange(event) {
        console.log('onChange');
        this.selectedFiles = event.srcElement.files;
    }

    onSubmit(event) {
        this.service.makeFileRequest('api/imagefile', [], this.selectedFiles).subscribe(value => {
            console.log(value);

            if (value.length > 0) {
                for (let i = 0; i < value.length; i++) {
                    let nfile = value[i];
                    this.uploadResult = new Array<any>();                  
                    this.uploadResult.push(nfile);
                }
            }
        });
    }
}
