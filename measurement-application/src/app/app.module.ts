import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MeasurementModule } from './measurement/measurement.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, MeasurementModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
