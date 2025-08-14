import { Component, inject } from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import { Router } from "@angular/router";
import { User } from '../../core/types/User';
import { AuthService } from '../../core/service/auth-service';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent  {
  private router = inject(Router);
  private authService = inject(AuthService);
  user : User | null = null;
  openMenu = false;
  openDropdown = false;

  handleKeydown(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }

  goToHome() {
    this.router.navigate(['/app-home'])
  }

  goToLogin() {
    this.router.navigate(['/app-login'])
  }

  goToProfile() {
    return this.router.navigate(['/app-profile'])
  }

  goToEventsPage() {
    return this.router.navigate(['/app-events'])
  }

  goToInstitutionPage() {
    return this.router.navigate(['/app-institution'])
  }


  goToAboutUspage() {
    return this.router.navigate(['/app-about-us'])
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    this.authService.isLogged();
  }

  toggleDropdown() {
    return null;
  }
}
