import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

interface ApiResponse {
  message: string;
  data: string;
}

@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrl: './heartbeat.component.css'
})
export class HeartbeatComponent {
  receivedData: any;
  errorMessage: string = '';
  sentNumber: number = -1;
  heartState = false;
  datos: string = '-';
  private pollingSubscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) { }

  activateHeartAnimation() {
    this.heartState = !this.heartState;
    this.enviarNumero(2);
  }

  enviarNumero(numero: number) {
    this.apiService.enviarNumero(numero).subscribe(
      (response: ApiResponse) => {
        console.log('Respuesta del servidor:', response);
        this.receivedData = response.data;
        this.errorMessage = ''; // Clear any previous error message
      },
      (error) => {
        console.error('Error al enviar datos:', error);
        this.errorMessage =
          'Error al enviar datos al servidor. Por favor, inténtelo de nuevo.';
      }
    );
    this.sentNumber = numero;
    this.listenServer();
  }

  listenServer() {
    this.pollingSubscription = this.apiService.obtenerDatosPeriodicamente(500).subscribe(
      (response) => {
        this.datos = response.data;
        console.log('Datos recibidos:', this.datos);
        this.islistening();
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
  islistening() {
    if (this.heartState == false) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
