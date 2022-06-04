import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistroComponent } from './components/registro/registro.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PublicarEventoComponent } from './components/publicar-evento/publicar-evento.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventoDetailsComponent } from './components/evento-details/evento-details.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EdadPipe } from './pipes/edad.pipe';
import { EditarEventoComponent } from './components/editar-evento/editar-evento.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrivacidadComponent } from './components/privacidad/privacidad.component';
import { FaqComponent } from './components/faq/faq.component';
import { EditarPerfilComponent } from './components/editar-perfil/editar-perfil.component';
import { UsuariosInscritosComponent } from './components/usuarios-inscritos/usuarios-inscritos.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CiudadesComponent } from './components/ciudades/ciudades.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegistroComponent,
    PublicarEventoComponent,
    EventosComponent,
    EventoDetailsComponent,
    PerfilComponent,
    EdadPipe,
    EditarEventoComponent,
    FooterComponent,
    PrivacidadComponent,
    FaqComponent,
    EditarPerfilComponent,
    UsuariosInscritosComponent,
    SpinnerComponent,
    CiudadesComponent,
    CategoriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxDropzoneModule,
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
