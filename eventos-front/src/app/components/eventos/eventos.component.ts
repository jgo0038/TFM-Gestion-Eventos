import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  listaEventosPasados: Evento[] = [];
  listaEventosFuturos: Evento[] = [];
  listaEventosID: string[] = [];
  toggleDuracion: boolean = false;
  toggleFecha: boolean = true;
  togglePrecio: boolean = false;
  verEventos: boolean = false;

  constructor(private router: Router,
              private categoriasService: CategoriasService,
              private eventosService: EventosService,
              private ciudadesService: CiudadesService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {
    this.formCiudad = this.fb.group({
      ciudad: ['', [Validators.required]]
    })
               }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.paramMap.get('ciudadID')){
      this.formCiudad.setValue({
        ciudad: this.activatedRoute.snapshot.paramMap.get('ciudadID')
      })
      if(this.formCiudad.get('ciudad')?.value){
        this.showEventos();
      }
    }
    
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
      divClicked!.style.backgroundImage = 'linear-gradient(to bottom, purple, #46a0fa)'
      divClicked!.style.color = 'white'
    }
    else{
      this.categoriasSelected = this.categoriasSelected.filter((cat) => {return cat !== idDiv})
      divClicked!.style.background = 'rgba(209, 213, 219)'
      divClicked!.style.color = 'black'
    }
  }

  getEventosCatOrdered(eventosCat: Evento[], ciudadName: string) {
    eventosCat.map((eventoCat: Evento) => {
      if(eventoCat.ciudad === ciudadName && !this.listaEventosID.includes(eventoCat.eventoID)){
        this.listaEventosID.push(eventoCat.eventoID)
        this.listaEventosPasados.push(eventoCat)
        if(new Date(eventoCat.fecha_evento) > new Date()){
          this.listaEventosFuturos.push(eventoCat)
        }
      }
    })
    this.listaEventosFuturos.sort((a,b) => (a.fecha_evento > b.fecha_evento) ? 1 : ((b.fecha_evento > a.fecha_evento) ? -1 : 0))
    this.listaEventosPasados.sort((a,b) => (a.fecha_evento > b.fecha_evento) ? 1 : ((b.fecha_evento > a.fecha_evento) ? -1 : 0))
    this.listaEventos = this.listaEventosFuturos
  }

  mostrarEventosPasados() {
    this.listaEventos = this.listaEventosPasados
  }

  ocultarEventosPasados(){
    this.listaEventos = this.listaEventosFuturos
  }

  orderDuracion() {
    this.toggleFecha = false;
    this.togglePrecio = false;
    this.toggleDuracion = !this.toggleDuracion
    this.listaEventos.sort((a,b) => (a.duracion > b.duracion) ? 1 : ((b.duracion > a.duracion) ? -1 : 0))
  }

  orderFecha() {
    this.toggleDuracion = false;
    this.togglePrecio = false;
    this.toggleFecha = !this.toggleFecha
    this.listaEventos.sort((a,b) => (a.fecha_evento > b.fecha_evento) ? 1 : ((b.fecha_evento > a.fecha_evento) ? -1 : 0))
  }

  orderPrecio() {
    this.toggleDuracion = false;
    this.toggleFecha = false;
    this.togglePrecio = !this.togglePrecio
    this.listaEventos.sort((a,b) => (a.precio > b.precio) ? 1 : ((b.precio > a.precio) ? -1 : 0))
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
    var selCiudadText = '';
    
    this.ciudadesService.getCiudadByID(selectCiudadValue).subscribe((ciudad: Ciudad) => {
      selCiudadText = ciudad.nombre
    })

    this.listaEventos = []
    this.listaEventosID = []
    this.listaEventosFuturos = []
    this.listaEventosPasados = []
    if (selectCiudadValue !== ''){
      this.busquedaTouched = true;
      if(this.categoriasSelected.length > 0){
        for(let i = 0; i < this.categoriasSelected.length; i++){
          this.eventosService.getEventosCategorias(this.categoriasSelected[i]).subscribe((eventosCat: Evento[]) => {
            if(eventosCat){
              this.getEventosCatOrdered(eventosCat, selCiudadText)
            }
            this.notEvents()
          })
        }
      } else {
        this.eventosService.getEventosCiudad(selectCiudadValue).subscribe((eventos) => {
          this.listaEventosPasados = eventos;
          eventos.map((evento: Evento) => {
            if(new Date(evento.fecha_evento) > new Date()){
              this.listaEventosFuturos.push(evento)
            }
          })
          this.listaEventos = this.listaEventosFuturos
          this.notEvents()
        })
      }      
    }
    else
      this.toastr.error('Selecciona una ciudad')
  }

}
