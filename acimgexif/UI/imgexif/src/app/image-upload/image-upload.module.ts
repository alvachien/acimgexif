import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import { MatButtonModule, MatDialogModule, MatListModule, MatProgressBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { UploadService } from './upload-service.service';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
  ],
  declarations: [
    ImageUploadComponent,
    UploadDialogComponent,
  ],
  exports: [
    ImageUploadComponent,
    UploadDialogComponent
  ],
  entryComponents: [
    UploadDialogComponent
  ], // Add the DialogComponent as entry component
  providers: [
    UploadService
  ],
})
export class ImageUploadModule { }
