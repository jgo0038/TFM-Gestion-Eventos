import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  errorCodes(code: string): string{
    switch(code) {
      case 'Unauthorized':
        return 'Contraseña incorrecta'
      case 'Internal Server Error': 
        return 'Usuario no encontrado'
      default:
        return 'Error desconocido'
    }
  }
}
