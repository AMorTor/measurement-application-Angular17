import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-send-data',
  templateUrl: './send-data.component.html',
  styleUrl: './send-data.component.css',
})
export class SendDataComponent {
  numero: number = 0;

  constructor(private apiService: ApiService) {}

  enviarNumero() {
    if (this.numero !== undefined) {
      this.apiService.enviarNumero(this.numero).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response);
          console.log(typeof response.toString()); // object (si el servidor responde con un JSON válido
          // Manejar la respuesta del servidor si es necesario
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 200) {
            // La respuesta del servidor no es un JSON válido, pero la solicitud se completó con éxito (status 200)
            console.error(
              'Error: La respuesta del servidor no es un JSON válido, pero la solicitud se completó con éxito'
            );
            console.log('Mensaje del servidor:', error.error);
          } else {
            console.error('Error al enviar número:', error);
            // Aquí puedes manejar otros tipos de errores
          }
        }
      );
    } else {
      console.error('Debe ingresar un número');
    }
  }
}
