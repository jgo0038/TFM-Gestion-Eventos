import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthToken } from '../models/authToken';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }

  async canActivate(): Promise<boolean | UrlTree> {
    if(!sessionStorage.getItem('email') || !sessionStorage.getItem('token')){
      this.router.navigate(['login']);
      return false;
    } else if(sessionStorage.getItem('email') && sessionStorage.getItem('token')){
      let tokenAuth: AuthToken = {
        token: sessionStorage.getItem('token')!,
        email: sessionStorage.getItem('email')!
      }
      let valid = await this.tokenValid(tokenAuth);
      if(valid)
        return true
      else{
        this.router.navigate(['login']);
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
