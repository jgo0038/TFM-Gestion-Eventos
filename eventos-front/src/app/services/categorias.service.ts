import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  baseURL: string = 'http://localhost:3000/api'

  constructor(private httpClient: HttpClient) { }

  getAllCategorias() {
    return this.httpClient.get<any>(this.baseURL + '/categorias')
  }

  getCategoriaByID(categoriaID: number) {
    return this.httpClient.get<any>(this.baseURL + '/categorias/' + categoriaID)
  }
}
