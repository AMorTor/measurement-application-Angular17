import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MainViewComponent } from './views/main-view/main-view.component';
import { SubjectInfoComponent } from './components/subject-info/subject-info.component';
import { HeartbeatComponent } from './components/heartbeat/heartbeat.component';
import { CellLoaderComponent } from './components/cell-loader/cell-loader.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { HeartComponent } from './components/heart/heart.component';


@NgModule({
  declarations: [
    SubjectInfoComponent,
    MainViewComponent,
    HeartbeatComponent,
    CellLoaderComponent,
    TemperatureComponent,
    HeartComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [MainViewComponent],
  providers: [provideHttpClient()],
})
export class MeasurementModule { }
