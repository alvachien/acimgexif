import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatBadgeModule, MatCardModule, MatCheckboxModule,
  MatFormFieldModule, MatSnackBarModule, MatDialogModule, MatInputModule,
  MatGridListModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { ThemePicker } from './theme-picker/theme-picker.component';
import { ThemeStorage } from './theme-picker/theme-storage/theme-storage';
import { StyleManager } from './style-manager/style-manager';
import { FooterComponent } from './app-footer/app-footer.component';
import { ImageUploadModule } from './image-upload/image-upload.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AppNavbarComponent,
    FooterComponent,
    ThemePicker
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,

    AppRoutingModule,
    ImageUploadModule,
  ],
  providers: [
    StyleManager,
    ThemeStorage,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
