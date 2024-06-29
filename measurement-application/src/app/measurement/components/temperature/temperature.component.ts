import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../../services/api.service';

interface ApiResponse {
  message: string;
  data: string;
}

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.css'
})
export class TemperatureComponent {
  temperature: number = 50; // Valor inicial en porcentaje (0 - 100)
  receivedData: any;
  errorMessage: string = '';
  sentNumber: number = -1;
  heartState = false;
  datos: string = '-';
  private pollingSubscription: Subscription = new Subscription();

  constructor(private apiService: ApiService) { }

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
        this.temperature = parseFloat(this.datos);
        console.log('Datos recibidos:', this.temperature);
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }

  ngOnDestroy() {
    // Cancelar la suscripción cuando el componente se destruya para evitar fugas de memoria
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
