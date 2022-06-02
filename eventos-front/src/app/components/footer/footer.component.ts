import { Component, OnInit } from '@angular/core';
import { Ciudad } from 'src/app/models/ciudad';
import { CiudadesService } from 'src/app/services/ciudades.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  ciudades: Ciudad[] = []
  constructor(private ciudadesService: CiudadesService) { }

  ngOnInit(): void {
    this.ciudadesService.getAllCiudades().subscribe((ciudades) => {
      this.ciudades = ciudades
    })
  }

}
