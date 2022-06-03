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
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { AuthGuardService as AuthGuard} from './services/auth-guard.service';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { AdminGuardService as AdminAuth } from './services/admin-guard.service';
import { CategoriasComponent } from './components/categorias/categorias.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'publicar', component: PublicarEventoComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'evento/:eventoID', component: EventoDetailsComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'eventos/:ciudadID', component: EventosComponent },
  { path: 'editarEvento/:eventoID', component: EditarEventoComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'perfil/:usuarioID', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'privacidad', component: PrivacidadComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'editarPerfil/:usuarioID', component: EditarPerfilComponent, canActivate: [AuthGuard] },
  { path: 'categorias', component: CategoriasComponent, canActivate: [AdminAuth] },
  { path: 'ciudades', component: CiudadesComponent, canActivate: [AdminAuth] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }