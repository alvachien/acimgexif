import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatBadgeModule, MatCardModule, MatCheckboxModule,
  MatFormFieldModule, MatSnackBarModule, MatDialogModule, MatInputModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { ThemePicker, ThemePickerModule, } from './theme-picker/theme-picker.component';
import { ThemeStorage } from './theme-picker/theme-storage/theme-storage';
import { StyleManager } from './style-manager/style-manager';
import { AppFooter } from './app-footer/app-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AppNavbarComponent,
    AppFooterComponent,
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

    AppRoutingModule,
    ThemePickerModule,
  ],
  providers: [
    StyleManager,
    ThemeStorage,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
