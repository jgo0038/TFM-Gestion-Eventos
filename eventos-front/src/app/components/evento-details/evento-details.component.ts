import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comentario } from 'src/app/models/comentario';
import { UsuarioInscrito } from 'src/app/models/usuarioInscrito';
import { ComentariosService } from 'src/app/services/comentarios.service';
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

  comentarios: Comentario[] = [];
  comentarioForm: FormGroup;
  creador: boolean = false;
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
  usuariosInscritos: Usuario[] = []
  verInscritos: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private eventoService: EventosService,
    private usuariosService: UsuariosService,
    private comentariosService: ComentariosService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) {
    this.eventoID = this.activatedRoute.snapshot.paramMap.get('eventoID');

    this.comentarioForm = this.fb.group({
      titulo: ['', [Validators.required]],
      comentario: ['', [Validators.required]]
    })

    if (this.eventoID) {
      this.eventoService.getEventosByID(this.eventoID).subscribe((evento: Evento) => {
        this.evento = evento
        this.usuariosService.getUserByMail(this.evento.creador).subscribe((user: Usuario) => {
          this.usuarioCreador = user;
          if (localStorage.getItem('email')) {
            this.usuariosService.getUserByMail(localStorage.getItem('email')!).subscribe((user: Usuario) => {
              this.usuarioID = user.usuarioID;
              this.usuarioEmail = user.mail;
              if (this.usuarioCreador.usuarioID === this.usuarioID) {
                this.creador = true;
              }
              for (let i = 0; i < user.eventosInscritos!.length; i++) {
                if (user.eventosInscritos![i].eventoID === this.eventoID!) {
                  this.inscrito = true;
                }
              }
            });
          }
        })
      })
      this.comentariosService.getComentariosEvento(this.eventoID).subscribe((comentarios: Comentario[]) => {
        comentarios.map((coment: Comentario) => {
          this.usuariosService.getUserByID(Number(coment.creador)).subscribe((userCreador: Usuario) => {
            coment.creador = userCreador.mail
          })
        })
        this.comentarios = comentarios
      })
    }
  }

  ngOnInit(): void {
    
  }

  anularInscripcion() {
    if (window.confirm("¿Deseas anular la inscripcion?")) {
      this.usuariosService.anularInscripcion(this.eventoID!, this.usuarioID!).subscribe((res) => {
        if (!res.error) {
          this.toastr.success("Inscripción anulada");
          window.location.reload();
        } else
          this.toastr.error("No se ha podido anular la inscripcion")
      })
    }
  }

  inscribirse(): void {
    this.usuariosService.inscribirse(this.eventoID!, this.usuarioID!).subscribe((res) => {
      if (!res.error) {
        this.inscrito = true;
        this.toastr.success("Inscripción realizada")
      }
      else {
        this.toastr.error("No se ha podido inscribir al evento")
      }
    })
  }

  publicarComentario(): void {
    let tituloComentario = this.comentarioForm.get('titulo')?.value;
    let textoComentario = this.comentarioForm.get('comentario')?.value;
    console.log(tituloComentario)
    console.log(textoComentario)
    this.comentariosService.publicarComentario(tituloComentario, textoComentario, new Date(), Number(this.usuarioID), this.eventoID!).subscribe((res) => {
      window.location.reload();
    })
  }

  verInscripciones(): void {
    this.verInscritos = !this.verInscritos
    this.usuariosInscritos = []
    if (this.eventoID) {
      this.eventoService.getInscripcionesEvento(this.eventoID).subscribe((inscripciones) => {
        inscripciones.map((usuarioInscrito: UsuarioInscrito) => {
          let usuarioInscritoID = usuarioInscrito.eventosInscritos_usuariosUsuarioID
          this.usuariosService.getUserByID(usuarioInscritoID).subscribe((usuario: Usuario) => {
            this.usuariosInscritos.push(usuario)
          })
        })
      })
    }
  }
}
