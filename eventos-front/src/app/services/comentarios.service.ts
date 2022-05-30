import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  baseURL: string = 'http://localhost:3000/api/comentarios'

  constructor(private httpClient: HttpClient) { }

  getComentariosEvento(eventoID: string) {
    return this.httpClient.get<any>(this.baseURL + '/' + eventoID)
  }

  publicarComentario(titulo: string, texto: string, fecha: Date, creador:number, eventoID: string) {
    return this.httpClient.post<any>(this.baseURL, {
      titulo: titulo,
      texto: texto,
      fecha: fecha,
      creador: creador,
      evento: eventoID
    })
  }
}
