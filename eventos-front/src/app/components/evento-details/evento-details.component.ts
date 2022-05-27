import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '../../models/evento';
import { Usuario } from '../../models/usuario';
import { EventosService } from '../../services/eventos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-evento-details',
  templateUrl: './evento-details.component.html',
  styleUrls: ['./evento-details.component.css']
})
export class EventoDetailsComponent implements OnInit {

  eventoID: string | null;
  evento: Evento = {
    eventoID: '',
    nombre: '',
    descripcion: '',
    ubicacion: '',
    fecha_pub: new Date(),
    fecha_evento: new Date(),
    precio: 0,
    inscripcion: false,
    cancelado: false,
    duracion: 0,
    creador: '',
    ciudad: '',
    fotoPortada: '',
    fotosEvento: [''],
    categorias: [],
    comentarios: [],
  }
  inscrito: boolean = false;
  usuarioEmail: string | null = '';
  usuarioID: number | undefined = 0;
  usuarioCreador: Usuario = {
    mail: '',
    nombre: '',
    apellidos: '',
    fecha_nac: new Date(),
    telefono: 0,
    particular: false,
    negocio: false,
    descripcion: '',
    ubicacion: '',
    contraseña: '',
    foto: '',
    genero: ''
  }

  constructor(private activatedRoute: ActivatedRoute,
    private eventoService: EventosService,
    private usuariosService: UsuariosService,
    private router: Router,
    private toastr: ToastrService) {
    this.eventoID = this.activatedRoute.snapshot.paramMap.get('eventoID');

    if (this.eventoID) {
      this.eventoService.getEventosByID(this.eventoID).subscribe((evento: Evento) => {
        this.evento = evento
        this.usuariosService.getUserByMail(this.evento.creador).subscribe((user: Usuario) => {
          this.usuarioCreador = user;
          
        })
      })
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuariosService.getUserByMail(localStorage.getItem('email')!).subscribe((user: Usuario) => {
        this.usuarioID = user.usuarioID;
        this.usuarioEmail = user.mail;
        for(let i = 0; i< user.eventosInscritos!.length; i++){
          if(user.eventosInscritos![i].eventoID === this.eventoID!){
            this.inscrito = true;
          }
        }
      });
    }
  }

  anularInscripcion() {
    if(window.confirm("Deseas anular la inscripcion?")){
      this.usuariosService.anularInscripcion(this.eventoID!, this.usuarioID!).subscribe((res) => {
        if(!res.error){
          this.toastr.success("Inscripción anulada");
          window.location.reload();
        } else 
          this.toastr.error("No se ha podido anular la inscripcion")
      })
    }
  }

  inscribirse() {
    this.usuariosService.inscribirse(this.eventoID!, this.usuarioID!).subscribe((res) => {
      if(!res.error){
        this.inscrito = true;
        this.toastr.success("Inscripción realizada")
      }
      else{
        this.toastr.error("No se ha podido inscribir al evento")
      }
    })
  }
}
