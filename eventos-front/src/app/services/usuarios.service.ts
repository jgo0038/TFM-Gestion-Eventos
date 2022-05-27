import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  baseURL: string = 'http://localhost:3000/api/usuarios'

  constructor(private httpClient: HttpClient) {}

  getUserByID(usuarioID: string) {
    return this.httpClient.get<any>(this.baseURL + '/'+ usuarioID)
  }
  

  getUserByMail(email: string) {
    return this.httpClient.get<any>(this.baseURL + '/mail/'+ email)
  }
  
  anularInscripcion(eventoID: string, usuarioID: number) {
    return this.httpClient.delete<any>(this.baseURL + '/borrarInscripcion/'+ eventoID + '/' + usuarioID)
  }
  
  inscribirse(eventoID: string, usuarioID: number) {
    return this.httpClient.put<any>(this.baseURL + '/inscribir/'+ eventoID + '/' + usuarioID, {})
  }
  
  getInscripciones(usuarioID: number) {
    return this.httpClient.get<any>(this.baseURL + '/inscripciones/' + usuarioID)
  }

  updateUser(usuarioID: number, email:string, nombre: string, apellidos: string, telefono: number, foto: string,
    particular:boolean, negocio:boolean, descripcion: string, ubicacion: string, fecha_nac: Date, contraseña: string) {
    return this.httpClient.put<any>(this.baseURL + '/' + usuarioID, {
      mail: email,
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono,
      foto: foto,
      particular: particular,
      negocio: negocio,
      descripcion: descripcion,
      ubicacion: ubicacion,
      fecha_nac: fecha_nac,
      contraseña: contraseña})
  }
}
