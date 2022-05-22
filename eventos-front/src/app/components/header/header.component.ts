import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token'))
      this.logged = true;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.logged = false;
    this.router.navigate(['/']);
  }
}
