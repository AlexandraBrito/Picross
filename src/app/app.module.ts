import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { CanvaComponent } from './canva/canva.component';
import { PopupComponent } from './popup/popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PicComponent } from './pic/pic.component';
import { PopupContent } from './popup/content/popup-content.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvaComponent,
    PopupComponent,
    PicComponent,
    PopupContent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
