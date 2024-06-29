import { Component, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subscription } from 'rxjs';

interface ApiResponse {
  message: string;
  data: string;
}

@Component({
  selector: 'app-heartbeat',
  templateUrl: './heartbeat.component.html',
  styleUrls: ['./heartbeat.component.css'] // Cambié styleUrl a styleUrls
})
export class HeartbeatComponent implements OnDestroy {
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
    this.islistening(); // Asegurarse de verificar el estado de la suscripción después de cambiar heartState
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
    if (!this.heartState) {
      this.pollingSubscription.unsubscribe();
      console.log('Se ha detenido la escucha');
    }
  }

  ngOnDestroy() {
    // Cancelar la suscripción cuando el componente se destruya para evitar fugas de memoria
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
