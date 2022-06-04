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
      token: localStorage.getItem('token')!,
      email: localStorage.getItem('email')!
    }
    this.authService.checkToken(tokenAuth).subscribe((res) => {
      this.logged = res
    })
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.logged = false;
    this.router.navigate(['/']);
  }

  checkAdmin() {
    if(localStorage.getItem('email') === 'ciudActive@gmail.com'){
      this.admin = true;
    }
  }

  darkMode() {
    let themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon')!;
    let themeToggleLightIcon = document.getElementById('theme-toggle-light-icon')!;
    let themeToggleContainer = document.getElementById('theme-toggle')!;
    let darkIcon = document.getElementById('dark-preview')!;

    // Change the icons inside the button based on previous settings
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        darkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
        themeToggleContainer.classList.remove('hidden');
    } else {
        darkIcon.classList.add('hidden');
        themeToggleDarkIcon.classList.remove('hidden');
        themeToggleContainer.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle')!;

    themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }
    
});
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
