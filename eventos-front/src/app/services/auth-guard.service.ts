import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AuthToken } from '../models/authToken';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) { }

  async canActivate(): Promise<boolean | UrlTree> {
    if(!localStorage.getItem('email') || !localStorage.getItem('token')){
      this.router.navigate(['login']);
      this.toastr.error('Inicia sesión para poder acceder')
      return false;
    } else if(localStorage.getItem('email') && localStorage.getItem('token')){
      let tokenAuth: AuthToken = {
        token: localStorage.getItem('token')!,
        email: localStorage.getItem('email')!
      }
      let valid = await this.tokenValid(tokenAuth);
      if(valid)
        return true
      else{
        this.router.navigate(['login']);
        this.toastr.error('Inicia sesión para poder acceder')
        return false;
      }
    }
    return true
  }
  
  tokenValid(token: AuthToken): Promise<boolean> {
    let valid: boolean = false
    return new Promise(resolve=>{
      this.authService.checkToken(token).pipe(
         take(1)
       )
       .subscribe(
          (res: boolean) => {
              resolve(res);
       })
  })
  }
}
