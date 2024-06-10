import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

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
  datosRecibidos: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  enviarNumero(numero: number) {
    this.apiService.enviarNumero(numero).subscribe(
      (response: ApiResponse) => {
        console.log('Respuesta del servidor:', response);
        this.datosRecibidos = response.data;
        this.errorMessage = ''; // Clear any previous error message
      },
      (error) => {
        console.error('Error al enviar datos:', error);
        this.errorMessage =
          'Error al enviar datos al servidor. Por favor, inténtelo de nuevo.';
      }
    );
  }

  detenerAccion() {
    console.log('Acción detenida');
  }
}
