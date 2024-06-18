import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  enviarNumero(numero: number): Observable<any> {
    const url = `${this.baseUrl}/enviar-datos`;
    return this.http.post(url, { numero });
  }

  obtenerDatosPeriodicamente(intervalo: number): Observable<any> {
    return timer(0, intervalo).pipe(
      switchMap(() => this.obtenerDatos())
    );
  }

  private obtenerDatos(): Observable<any> {
    const url = `${this.baseUrl}/obtener-datos`;
    return this.http.get(url);
  }
}
