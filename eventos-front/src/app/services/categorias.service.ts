import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  baseURL: string = 'http://localhost:3000/api/categorias'

  constructor(private httpClient: HttpClient) { }

  borrarCategoria(categoriaID: number) {
    return this.httpClient.delete<any>(this.baseURL + '/' + categoriaID)
  }

  crearCategoria(nombre: string, descripcion: string) {
    return this.httpClient.post<any>(this.baseURL, {nombre: nombre, descripcion: descripcion})
  }

  getAllCategorias() {
    return this.httpClient.get<any>(this.baseURL)
  }

  getCategoriaByID(categoriaID: number) {
    return this.httpClient.get<any>(this.baseURL + '/' + categoriaID)
  }

  updateCategoria(categoriaID: number, nombre: string, descripcion: string) {
    return this.httpClient.put<any>(this.baseURL + '/' + categoriaID, {categoriaID: categoriaID, nombre: nombre, descripcion: descripcion})
  }
}
