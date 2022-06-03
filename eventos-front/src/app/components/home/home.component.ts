import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ciudad } from 'src/app/models/ciudad';
import { Evento } from 'src/app/models/evento';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  burgosID: number = 0;
  madridID: number = 0;
  santanderID: number = 0;

  constructor(private router: Router, private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.loadCiudadesID();
  }

  loadCiudadesID(): void {
    this.ciudadesService.getAllCiudades().subscribe((ciudades: Ciudad[]) => {
      ciudades.map((ciudad: Ciudad) => {
        if(ciudad.nombre === 'Burgos')
          this.burgosID = ciudad.ciudadID
        if(ciudad.nombre === 'Madrid')
          this.madridID = ciudad.ciudadID
        if(ciudad.nombre === 'Santander')
          this.santanderID = ciudad.ciudadID
      })
    })
  }

  searchCiudad(ciudadID: number): void {
    this.router.navigateByUrl('/eventos/' + ciudadID)
  }
}
