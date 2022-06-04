import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthToken } from '../models/authToken';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate{

  constructor(private router: Router,
              private authService: AuthService,
              private authGuard: AuthGuardService,
              private toastr: ToastrService) { }


  async canActivate(): Promise<boolean | UrlTree> {
    if(!localStorage.getItem('email') || !localStorage.getItem('token')){
      this.router.navigate(['login']);
      this.toastr.error('Inicia sesión para poder acceder')
      return false;
    } else if(localStorage.getItem('email') && localStorage.getItem('token')){
      return await this.checkUserAdmin()
    }
    return true
  }

  async checkUserAdmin(): Promise<boolean> {
    let tokenAuth: AuthToken = {
      token: localStorage.getItem('token')!,
      email: 'ciudActive@gmail.com'
    }
    let valid = await this.authGuard.tokenValid(tokenAuth);

    if(valid)
      return true
    else{
      this.router.navigate(['/']);
      this.toastr.error('No tiene permisos para acceder')
      return false;
    }
  }
}
