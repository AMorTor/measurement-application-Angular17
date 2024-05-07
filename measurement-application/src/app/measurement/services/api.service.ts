import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; // Cambia esto si tu servidor Express está en un puerto diferente

  constructor(private http: HttpClient) {}

  enviarDatos(datos: any) {
    return this.http.post(`${this.baseUrl}/enviar-datos`, datos);
  }
  enviarNumero(numero: number) {
    const url = `${this.baseUrl}/enviar-datos`;
    return this.http.post(url, { numero });
  }
}
