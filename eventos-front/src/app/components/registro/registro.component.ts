import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { ImagesService } from 'src/app/services/images.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerForm: FormGroup;
  registerFormParticular: FormGroup;
  registerFormNegocio: FormGroup;
  negocio: boolean = false;
  particular: boolean = false;
  foto: string = '';
  fotosUploaded: boolean = false;
  files: File[] = [];
  reader = new FileReader();

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService,
              private errorService: ErrorsService,
              private imagenesService: ImagesService,
              private spinnerService: SpinnerService,
              private usuariosService: UsuariosService) {
    this.registerForm = this.fb.group({
      negocio: ['', [Validators.required]],
      particular: ['', [Validators.required]]
    }),
    this.registerFormParticular = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      descripcion: [''],
      fecha_nac: ['', [Validators.required]],
      genero: ['', [Validators.required, Validators.pattern('[H|M|h|m]')]],
      contraseña: ['', [Validators.required, Validators.pattern('^.{6,}$')]],
      privacidad: ['', Validators.required]
    }),
    this.registerFormNegocio = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      ubicacion: ['', [Validators.required]],
      descripcion: [''],
      fecha_nac: ['', [Validators.required]],
      contraseña: ['', [Validators.required, Validators.pattern('^.{6,}$')]],
      privacidad: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  onUploadImage() {
    this.spinnerService.show()
    this.fotosUploaded = true;
    // Error subida sin imagenes
    if(!this.files[0]){
      this.toastr.error('Añade una imagen primero :)')
      this.spinnerService.hide()
    }
    // Subida a cloudinary
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'usuarios_cloudinary');
    data.append('cloud_name', 'dopt5keee');

    if(this.files.length > 1){
      this.toastr.error('Suba una única foto de perfil')
      this.spinnerService.hide()
    } else {
      this.imagenesService.uploadImagen(data).subscribe((res: any)=>{
        if(res)
          this.foto = res.secure_url;
          this.spinnerService.hide()
          this.toastr.success('Imagen subida correctamente');
      }, error => {
        this.toastr.error('No se pudo subir la imagen')
      });
    }
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  selectNegocio() {
    this.negocio = true;
    this.particular = false;
  }

  selectParticular() {
    this.particular = true;
    this.negocio = false;
  }

  registerNegocio() {
    const nombre = this.registerFormNegocio.get('nombre')?.value;
    const mail = this.registerFormNegocio.get('mail')?.value;
    const telefono = this.registerFormNegocio.get('telefono')?.value;
    const fecha_nac = this.registerFormNegocio.get('fecha_nac')?.value;
    const contraseña = this.registerFormNegocio.get('contraseña')?.value;
    const ubicacion = this.registerFormNegocio.get('ubicacion')?.value;
    const descripcion = this.registerFormNegocio.get('descripcion')?.value;
    const privacidad = this.registerFormNegocio.get('privacidad')?.value;

    if(this.registerFormNegocio.valid && privacidad){
      let confirm: boolean = true;
      if(!this.fotosUploaded){
        confirm = window.confirm('Si no ha seleccionado los botones para subir las imágenes no serán actualizadas.¿Desea continuar?')
      }
      if(confirm){
        this.authService.registerNegocio(
          nombre, mail, telefono, fecha_nac, contraseña, ubicacion, descripcion, this.foto).subscribe((res) => {
            this.toastr.success('Usuario creado correctamente');
            this.router.navigate(['/login']);
          },
          error => {
            this.usuariosService.getUserByMail(mail).subscribe((usuario: Usuario) => {
              if(usuario.mail === mail)
                this.toastr.error('El correo introducido ya está en uso');
            })
            this.toastr.error('No se ha podido crear el usuario');
          })
      }
    } else if(!privacidad){
      this.toastr.error('Es necesario aceptar la política de privacidad')
    }
  }

  registerParticular() {
    const nombre = this.registerFormParticular.get('nombre')?.value;
    const apellidos = this.registerFormParticular.get('apellidos')?.value;
    const mail = this.registerFormParticular.get('mail')?.value;
    const telefono = this.registerFormParticular.get('telefono')?.value;
    const fecha_nac = this.registerFormParticular.get('fecha_nac')?.value;
    let genero = this.registerFormParticular.get('genero')?.value;
    const contraseña = this.registerFormParticular.get('contraseña')?.value;
    const descripcion = this.registerFormParticular.get('descripcion')?.value;
    const privacidad = this.registerFormParticular.get('privacidad')?.value;

    (genero === 'H') ? genero = 'hombre' : genero = 'mujer'

    if(this.registerFormParticular.valid && privacidad){
      let confirm: boolean = true;
      if(!this.fotosUploaded){
        confirm = window.confirm('Si no ha seleccionado los botones para subir las imágenes no serán actualizadas.¿Desea continuar?')
      }
      if(confirm){
        this.authService.registerParticular(
          nombre, apellidos, mail, telefono, fecha_nac, genero, contraseña, descripcion, this.foto).subscribe((res) => {
            this.toastr.success('Usuario creado correctamente');
            this.router.navigate(['/login']);
          },
          error => {
            this.usuariosService.getUserByMail(mail).subscribe((usuario: Usuario) => {
              if(usuario.mail === mail)
                this.toastr.error('El correo introducido ya está en uso');
            })
            this.toastr.error('No se ha podido crear el usuario');
          })
      }
    } else if(!privacidad){
      this.toastr.error('Es necesario aceptar la política de privacidad')
    }
  }

  verPassword() {
    var contraseñaInput = document.getElementById("contraseñaInput");
    if (contraseñaInput?.getAttribute('type') === "password") {
      contraseñaInput.setAttribute('type', 'text');
    } else {
      contraseñaInput?.setAttribute('type', 'password');
    }
  }
}
