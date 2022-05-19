import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  baseURL: string = 'http://localhost:3000/api/eventos'

  constructor(private httpClient: HttpClient) { }
  
  getAllEventos(){
    return this.httpClient.get<any>(this.baseURL);
  }

  getEventosByID(eventoID: string){
    return this.httpClient.get<any>(this.baseURL + '/' + eventoID);
  }

  getEventosCategorias(categoriaID: number){
    return this.httpClient.get<any>(this.baseURL + '/eventoCategoria/' + categoriaID);
  }

  getEventosCiudad(ciudadID: number){
    return this.httpClient.get<any>(this.baseURL + '/eventoCiudad/' + ciudadID);
  }

  publicarEvento(nombre: String, descripcion: string, ubicacion: string, fecha_evento: Date, fecha_pub: Date, precio: number,
    inscripcion: boolean, duracion: number, creador: number, ciudad: number, categorias: number[], fotoPortada?: string, fotosEvento?: string[]) {
      return this.httpClient.post<any>(this.baseURL, {
        nombre: nombre,
        descripcion: descripcion,
        ubicacion: ubicacion,
        fecha_evento: fecha_evento,
        fecha_pub: fecha_pub,
        precio: precio,
        inscripcion: inscripcion,
        cancelado: false,
        duracion: duracion,
        creador: creador,
        ciudad: ciudad,
        categorias: categorias,
        fotoPortada: fotoPortada,
        fotosEvento: fotosEvento
      })
  }
}
