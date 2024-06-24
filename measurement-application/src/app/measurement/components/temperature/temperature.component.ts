import { Component } from '@angular/core';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.css'
})
export class TemperatureComponent {
  temperature: number = 50; // Valor inicial en porcentaje (0 - 100)

  getFlameColor(): string {
    if (this.temperature <= 50) {
      return 'linear-gradient(to top, #00f, #0ff)'; // De azul a cian
    } else {
      return 'linear-gradient(to top, #f00, #ff0)'; // De rojo a amarillo
    }
  }
}
