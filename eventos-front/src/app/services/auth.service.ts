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

  registerNegocio(nombre: string, mail: string, telefono: number, fecha_nac: Date, contraseña: string,
    ubicacion:string, descripcion?: string, foto?: string){
    return this.httpClient.post<any>(this.baseURL + '/usuarios', 
      {nombre: nombre,
      mail: mail,
      telefono: telefono,
      fecha_nac: fecha_nac,
      contraseña: contraseña,
      negocio: true,
      particular: false,
      ubicacion: ubicacion,
      descripcion: descripcion,
      foto: foto
    });
  }
  
  registerParticular(nombre: string, apellidos: string, mail: string, telefono: number, fecha_nac: Date,
    genero: string, contraseña: string, descripcion?: string, foto?: string){
    return this.httpClient.post<any>(this.baseURL + '/usuarios', 
      {nombre: nombre,
      apellidos: apellidos,
      mail: mail,
      telefono: telefono,
      fecha_nac: fecha_nac,
      contraseña: contraseña,
      negocio: false,
      particular: true,
      genero: genero,
      descripcion: descripcion,
      foto: foto
    });
  }
 
}
