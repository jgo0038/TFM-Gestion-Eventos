import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorsService } from 'src/app/services/errors.service';

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

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService,
              private errorService: ErrorsService) {
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
      contraseña: ['', [Validators.required, Validators.pattern('^.{6,}$')]]
    }),
    this.registerFormNegocio = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      ubicacion: ['', [Validators.required]],
      descripcion: [''],
      fecha_nac: ['', [Validators.required]],
      contraseña: ['', [Validators.required, Validators.pattern('^.{6,}$')]]
    })
   }

  ngOnInit(): void {
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
    console.log(fecha_nac)
    this.authService.registerNegocio(
      nombre, mail, telefono, fecha_nac, contraseña, ubicacion, descripcion).subscribe((res) => {
        console.log(res)
        this.toastr.success('Usuario creado correctamente');
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error.statusText)
      })
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

    (genero === 'H') ? genero = 'hombre' : genero = 'mujer'

    this.authService.registerParticular(
      nombre, apellidos, mail, telefono, fecha_nac, genero, contraseña, descripcion).subscribe((res) => {
        this.toastr.success('Usuario creado correctamente');
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error.statusText);
        this.toastr.error(this.errorService.errorCodes(error.statusText), 'Error');
      })
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
