import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseURL: string = 'http://localhost:3000/api/usuarios'

  constructor(private httpClient: HttpClient) {}

  getUserByMail(email: string) {
    return this.httpClient.get<any>(this.baseURL + '/mail/'+ email)
  }
  
  inscribirse(eventoID: string, usuarioID: number) {
    return this.httpClient.put<any>(this.baseURL + '/inscribir/'+ eventoID + '/' + usuarioID, {})
  }
  
  getInscripciones(usuarioID: number) {
    return this.httpClient.get<any>(this.baseURL + '/inscripciones/' + usuarioID)
  }
}
