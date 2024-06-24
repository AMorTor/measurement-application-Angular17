import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

interface ApiResponse {
  message: string;
  data: string;
}

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css'],
})
export class MainViewComponent {
  receivedData: string = '';
  errorMessage: string = '';
  datos: string = '';
  sentNumber: number = 0;
  private pollingSubscription: Subscription = new Subscription();
  heartState = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.pollingSubscription = this.apiService.obtenerDatosPeriodicamente(500).subscribe(
      (response) => {
        this.datos = response.data;
        console.log('Datos recibidos:', this.datos);
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }

}
