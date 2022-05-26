import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PublicarEventoComponent } from './components/publicar-evento/publicar-evento.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EventoDetailsComponent } from './components/evento-details/evento-details.component';
import { EditarEventoComponent } from './components/editar-evento/editar-evento.component';
import { PrivacidadComponent } from './components/privacidad/privacidad.component';
import { FaqComponent } from './components/faq/faq.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'publicar', component: PublicarEventoComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'evento/:eventoID', component: EventoDetailsComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'eventos/:ciudadID', component: EventosComponent },
  { path: 'editarEvento/:eventoID', component: EditarEventoComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'privacidad', component: PrivacidadComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }