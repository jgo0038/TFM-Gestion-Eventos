import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(private eventosService: EventosService) { }

  ngOnInit(): void {
    this.eventosService.getAllEventos().subscribe((res) => {
      console.log(res)
    })
  }

}
