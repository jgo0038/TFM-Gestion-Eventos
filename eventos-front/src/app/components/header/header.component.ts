import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from 'src/app/models/authToken';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  admin: boolean = false;
  logged: boolean = false;
  showMenu: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAdmin()
    let tokenAuth: AuthToken = {
      token: sessionStorage.getItem('token')!,
      email: sessionStorage.getItem('email')!
    }
    this.authService.checkToken(tokenAuth).subscribe((res) => {
      this.logged = res
    })
  }

  cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    this.logged = false;
    this.router.navigate(['/']);
  }

  checkAdmin() {
    if(sessionStorage.getItem('email') === 'ciudActive@gmail.com'){
      this.admin = true;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
