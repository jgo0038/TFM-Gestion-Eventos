import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { ImagesService } from 'src/app/services/images.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  contraseña: string = '';
  editarPerfilForm: FormGroup;
  files: File[] = [];
  foto: string = '';
  fotoUploaded: boolean = false;
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
    genero: ''
  }
  usuarioID: string = '';

  constructor(private usuariosService: UsuariosService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private errorService: ErrorsService,
              private fb: FormBuilder,
              private imagenesService: ImagesService,
              private router: Router,
              private toastr: ToastrService) {

    this.usuarioID = this.activatedRoute.snapshot.paramMap.get('usuarioID')!;   

    this.editarPerfilForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: [''],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      descripcion: [''],
      fecha_nac: ['', [Validators.required]],
      ubicacion: [''],
      contraseñaActual: ['', [Validators.required, Validators.pattern('^.{6,}$')]],
      contraseñaNueva: ['']
    })
   }

  ngOnInit(): void {
    if(this.usuarioID != ''){
      this.usuariosService.getUserByID(this.usuarioID).subscribe((user: Usuario) => {
        this.usuario = user;
        if(user.foto)
          this.foto = user.foto;
        if(user.mail === localStorage.getItem('email')){
          this.editarPerfilForm.patchValue({
            nombre: user.nombre,
            apellidos: user.apellidos,
            telefono: user.telefono,
            descripcion: user.descripcion,
            fecha_nac: user.fecha_nac,
            ubicacion: user.ubicacion
          })
          this.editarPerfilForm.updateValueAndValidity();
          console.log(this.editarPerfilForm.get('apellidos')?.value)
        } else {
          this.router.navigate(['/'])
        }
      })
      
    } else {
      this.router.navigate(['/'])
    }
  }

  guardarPerfil() {
    if(this.editarPerfilForm.valid){
      const nombre = this.editarPerfilForm.get('nombre')?.value;
      const apellidos = this.editarPerfilForm.get('apellidos')?.value;
      const telefono = this.editarPerfilForm.get('telefono')?.value;
      const fecha_nac = this.editarPerfilForm.get('fecha_nac')?.value;
      const descripcion = this.editarPerfilForm.get('descripcion')?.value;
      const ubicacion = this.editarPerfilForm.get('ubicacion')?.value;
      const contraseñaActual = this.editarPerfilForm.get('contraseñaActual')?.value;
      const contraseñaNueva = this.editarPerfilForm.get('contraseñaNueva')?.value;

      

      this.authService.checkContraseña(this.usuario.mail, contraseñaActual).subscribe((res: boolean) => {
        if(contraseñaNueva)
          this.updateContraseña(contraseñaActual, contraseñaNueva)
        else
          this.contraseña = contraseñaActual
        if(res === true){
          this.usuariosService.updateUser(Number(this.usuarioID), this.usuario.mail, nombre, apellidos, telefono, this.foto,
          this.usuario.particular, this.usuario.negocio, descripcion, ubicacion, fecha_nac, this.contraseña).subscribe((res) => {
            this.toastr.success('El perfil ha sido actualizado')
            this.router.navigate(['/perfil'])
          }, error => {
            this.toastr.error('No se ha podido actualizar el perfil')
          })
        } else {
          this.toastr.error('La contraseña no es correcta');
        }
      })      
    }
  }

  onUploadImage() {
    this.fotoUploaded = true;
    // Error subida sin imagenes
    if(!this.files[0]){
      this.toastr.error('Añade una imagen primero')
    }
    // Subida a cloudinary
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'usuarios_cloudinary');
    data.append('cloud_name', 'dopt5keee');

    if(this.files.length > 1){
      this.toastr.error('Suba una única foto de perfil')
    } else {
      this.imagenesService.uploadImagen(data).subscribe((res: any)=>{
        if(res)
          this.foto = res.secure_url;
          this.toastr.success('Imagen subida correctamente');
      }, error => {
        this.toastr.error('No se pudo subir la imagen')
      });
    }
  }

  onSelect(event: any): void {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  updateContraseña(contraseñaActual: string, contraseñaNueva: string): void {
    if(contraseñaNueva !== contraseñaActual){
      this.contraseña = contraseñaNueva
      this.toastr.success('Contraseña actualizada')
    } else {
      this.toastr.error('La contraseña actual no coincide o la nueva no puede ser la misma')
    }
  }
}
