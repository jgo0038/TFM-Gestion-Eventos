import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  logged: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService,
              private errorService: ErrorsService) { 
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required]]
    })
    toastr.toastrConfig.positionClass = 'toast-center-center';
  }

  ngOnInit(): void {
    
  }

  login() {
    const usuario = this.loginForm.get('usuario')?.value;
    const contraseña = this.loginForm.get('contraseña')?.value;
    let authToken;
    this.authService.login(usuario, contraseña).subscribe((res) => {
      if(res.access_token){
        authToken = res.access_token;
        localStorage.setItem("email", usuario);
        localStorage.setItem("token", authToken);
        // localStorage.setItem("authHttp", )
        this.router.navigate(['/'])
      }
    },
    error => {
      this.toastr.error(this.errorService.errorCodes(error.statusText), 'Error');
    })

  }
}
