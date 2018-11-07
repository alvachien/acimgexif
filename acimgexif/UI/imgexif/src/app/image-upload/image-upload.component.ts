import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { UploadService } from './upload-service.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  constructor(public dialog: MatDialog, public uploadService: UploadService) {}

  ngOnInit() {
    // DO nothing
  }

  public openUploadDialog() {
    let dialogRef = this.dialog.open(UploadDialogComponent, { width: '50%', height: '50%' });
  }
}
