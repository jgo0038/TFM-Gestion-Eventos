import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PublicarEventoComponent } from './components/publicar-evento/publicar-evento.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EventoDetailsComponent } from './evento-details/evento-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'publicar', component: PublicarEventoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'evento/:eventoID', component: EventoDetailsComponent },
  { path: 'eventos', component: EventosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }