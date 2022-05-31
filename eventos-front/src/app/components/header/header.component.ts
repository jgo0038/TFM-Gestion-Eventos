import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged: boolean = false;
  showMenu: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('token'))
      this.logged = true;
  }

  cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    this.logged = false;
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
