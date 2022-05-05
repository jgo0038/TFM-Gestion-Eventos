import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                
    const authToken: string = localStorage.getItem('token')!;
    
    let request = req;

    if(authToken) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${authToken}`,
        }
      })
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {

        if (err.status === 401) {
          this.router.navigate(['/login']);
        }

        return throwError( err );
      })
    );
  }
}
