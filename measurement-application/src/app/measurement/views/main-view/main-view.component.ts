import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css',
})
export class MainViewComponent {
  constructor(private apiService: ApiService) {}

  enviarDatosAlServidor() {
    const datos = {
      /* Tus datos aquí */
    };
    this.apiService.enviarDatos(datos).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        // Aquí puedes manejar la respuesta del servidor
      },
      (error) => {
        console.error('Error al enviar datos:', error);
        // Aquí puedes manejar los errores
      }
    );
  }
}
