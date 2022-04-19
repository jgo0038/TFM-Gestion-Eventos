import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL: string = 'http://localhost:3000/api'

  constructor(private httpClient: HttpClient) { }
  
  login(usuario: string, contraseña: string){
    return this.httpClient.post<any>(this.baseURL + '/auth', {email: usuario, password: contraseña});
  }
}
