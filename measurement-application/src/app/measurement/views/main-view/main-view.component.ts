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
  datosRecibidos: string = '';
  errorMessage: string = '';
  datos: any;
  private pollingSubscription: Subscription = new Subscription();
  animatedHeart = false;

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
    this.animatedHeart = !this.animatedHeart;
  }

  detenerAccion() {
    console.log('Acción detenida');
    this.animatedHeart = !this.animatedHeart;
  }





  ngOnDestroy() {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }


}
