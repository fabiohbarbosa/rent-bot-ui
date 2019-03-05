import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from '@angular/cdk/layout';

import { AppComponent } from './app.component';
import { HousesModule } from './houses/houses.module';
import { MaterialModule } from './material/material.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    MenuModule,
    HousesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
