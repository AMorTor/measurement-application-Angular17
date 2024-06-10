import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000'; //

  constructor(private http: HttpClient) {}

  enviarNumero(numero: number): Observable<any> {
    const url = `${this.baseUrl}/enviar-datos`;
    return this.http.post(url, { numero });
  }
}
