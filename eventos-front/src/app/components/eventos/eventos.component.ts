import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Ciudad } from 'src/app/models/ciudad';
import { Evento } from 'src/app/models/evento';
import { CategoriasService } from 'src/app/services/categorias.service';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  busquedaTouched: boolean = false;
  categorias: Categoria[] = [];
  categoriasSelected: number[] = [];
  ciudadOption: string = '';
  ciudades: Ciudad[] = [];
  eventosEncontrados: boolean = false;
  formCiudad: FormGroup;
  listaEventos: Evento[] = [];
  verEventos: boolean = false;

  constructor(private router: Router,
              private categoriasService: CategoriasService,
              private eventosService: EventosService,
              private ciudadesService: CiudadesService,
              private fb: FormBuilder,
              private toastr: ToastrService) {
    this.formCiudad = this.fb.group({
      ciudad: ['', [Validators.required]]
    })
               }

  ngOnInit(): void {

    this.ciudadesService.getAllCiudades().subscribe((ciudades) => {
      for (let i = 0; i < ciudades.length; i++) {
        let ciudad: Ciudad = {
          ciudadID: ciudades[i].ciudadID,
          nombre: ciudades[i].nombre,
          descripcion: ciudades[i].descripcion
        }
        this.ciudades.push(ciudad);
      }
    });

    this.categoriasService.getAllCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    })
  }

  addCategoria(event: any): void {
    var target = event.target || event.srcElement || event.currentTarget;
    var idDiv = target.attributes.id.value;
    var divClicked = document.getElementById(idDiv);
    if(!this.categoriasSelected.includes(idDiv)){
      this.categoriasSelected.push(idDiv);
      divClicked!.style.background = 'green'
      divClicked!.style.color = 'white'
    }
    else{
      this.categoriasSelected = this.categoriasSelected.filter((cat) => {return cat !== idDiv})
      divClicked!.style.background = 'rgba(209, 213, 219)'
      divClicked!.style.color = 'black'
    }
  }

  notEvents() {
    if(this.listaEventos.length > 0)
        this.eventosEncontrados = true
      else
        this.eventosEncontrados = false
  }

  showEventoDetail(eventoID: string): void {
    this.router.navigateByUrl('/evento/' + eventoID)
  }

  showEventos(): void {
    const eventos = document.getElementById('eventosContainer');
    const selectCiudadValue = this.formCiudad.get('ciudad')?.value;
    var selCiudad = document.getElementById("selectCiudad") as HTMLSelectElement | null;
    var selCiudadText = '';
    if(selCiudad != null) {
      selCiudadText = selCiudad.options[selCiudad.selectedIndex].text;
    }
    this.listaEventos = []
    if (selectCiudadValue !== ''){
      this.busquedaTouched = true;
      if(this.categoriasSelected.length > 0){
        for(let i = 0; i < this.categoriasSelected.length; i++){
          this.eventosService.getEventosCategorias(this.categoriasSelected[i]).subscribe((eventosCat: Evento[]) => {
            if(eventosCat){
                eventosCat.map((eventoCat: Evento) => {
                  if(eventoCat.ciudad === selCiudadText)
                    this.listaEventos.push(eventoCat)
              })}
            this.notEvents()
          })
        }
      } else {
        this.eventosService.getEventosCiudad(selectCiudadValue).subscribe((eventos) => {
          this.listaEventos = eventos;
          this.notEvents()
        })
      }
    }
      
    else
      this.toastr.error('Selecciona una ciudad')
  }

}
