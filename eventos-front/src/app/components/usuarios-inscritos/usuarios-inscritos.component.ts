import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-usuarios-inscritos',
  templateUrl: './usuarios-inscritos.component.html',
  styleUrls: ['./usuarios-inscritos.component.css']
})
export class UsuariosInscritosComponent implements OnInit {

  @Input() usuariosInscritos!: any[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    document.addEventListener('keydown', function(event){
      if(event.key === "Escape"){
        document.getElementById('listaInscritos')!.style.visibility = 'hidden'
      }
    });
  }

  abrirPerfil(usuarioID: number): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/perfil/${usuarioID}`])
    );
  
    window.open(url, '_blank');
  }
}
