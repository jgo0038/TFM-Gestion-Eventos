import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private httpClient: HttpClient, private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler)
   }
  
  uploadImagen(vals: any){
    let data = vals;
    return this.httpClient.post(
      'https://api.cloudinary.com/v1_1/dopt5keee/image/upload',
      data)
  }

}
