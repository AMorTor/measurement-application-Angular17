import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SendDataComponent } from './components/send-data/send-data.component';
import { HeartbeatComponent } from './components/heartbeat/heartbeat.component';
import { TemperatureComponent } from './components/temperature/temperature.component';
import { CellLoaderComponent } from './components/cell-loader/cell-loader.component';
import { MainViewComponent } from './views/main-view/main-view.component';
import { SubjectInfoComponent } from './components/subject-info/subject-info.component';
import { OnlyAHeartComponent } from './components/only-aheart/only-aheart.component';

@NgModule({
  declarations: [
    SendDataComponent,
    HeartbeatComponent,
    TemperatureComponent,
    CellLoaderComponent,
    MainViewComponent,
    SubjectInfoComponent,
    OnlyAHeartComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [MainViewComponent],
  providers: [provideHttpClient()],
})
export class MeasurementModule {}
