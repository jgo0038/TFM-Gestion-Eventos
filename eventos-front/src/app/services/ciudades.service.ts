import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  baseURL: string = 'http://localhost:3000/api/ciudades'

  constructor(private httpClient: HttpClient) { }

  crearCiudad(nombre: string, descripcion: string) {
    return this.httpClient.post<any>(this.baseURL, {nombre: nombre, descripcion: descripcion})
  }

  deleteCiudad(ciudadID: number) {
    return this.httpClient.delete<any>(this.baseURL + '/' + ciudadID)
  }

  getAllCiudades() {
    return this.httpClient.get<any>(this.baseURL)
  }

  getCiudadByID(ciudadID: number) {
    return this.httpClient.get<any>(this.baseURL + '/' + ciudadID)
  }

  updateCiudad(ciudadID: number, nombre: string, descripcion: string) {
    return this.httpClient.put<any>(this.baseURL + '/' + ciudadID, {ciudadID: ciudadID, nombre: nombre, descripcion: descripcion})
  }
}
