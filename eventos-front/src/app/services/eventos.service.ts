import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  baseURL: string = 'http://localhost:3000/api'

  constructor(private httpClient: HttpClient) { }
  
  getAllEventos(){
    return this.httpClient.get<any>(this.baseURL + '/eventos');
  }
}
