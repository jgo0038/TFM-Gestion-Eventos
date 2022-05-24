import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { Usuario } from 'src/app/models/usuario';
import { EventosService } from 'src/app/services/eventos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  listEventosCreados: Evento[] = []
  listEventosInscritos: Evento[] = []
  usuario: Usuario = {
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
  }
  showEventosCreados: boolean = true;
  showEventosInscritos: boolean = false;

  constructor(private usuariosService: UsuariosService,
              private eventosService: EventosService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuariosService.getUserByMail(localStorage.getItem('email')!).subscribe((usuario: Usuario) => {
        this.usuario = usuario;
        if(usuario.eventosCreados)
          this.listEventosCreados = usuario.eventosCreados
        if(usuario.eventosInscritos)
          this.listEventosInscritos = usuario.eventosInscritos
      });
    } else {
      this.router.navigate(['/'])
    }
  }

  borrarEvento(eventoID: string): void {
    if(confirm('El evento será borrado de forma definitiva')){
      this.eventosService.borrarEvento(eventoID).subscribe((res) => {
        if(!res.error){
          this.toastr.success('Evento borrado correctamente')
        } else {
          this.toastr.error('El evento no se ha podido borrar, intentélo más tarde')
        }
      })
    }
  }

  editarEvento(eventoID: string): void {
    this.router.navigateByUrl('/editarEvento/' + eventoID)
  }

  eventosCreados(): void {
    this.showEventosCreados = true;
    this.showEventosInscritos = false;
  }

  eventosInscritos(): void {
    this.showEventosCreados = false;
    this.showEventosInscritos = true;
  }

  showEventoDetails(eventoID: string): void {
    this.router.navigateByUrl('/evento/' + eventoID)
  }
}
