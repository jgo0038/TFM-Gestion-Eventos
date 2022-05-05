import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  baseURL: string = 'http://localhost:3000/api'

  constructor(private httpClient: HttpClient) { }

  getAllCiudades() {
    return this.httpClient.get<any>(this.baseURL + '/ciudades')
  }
}
