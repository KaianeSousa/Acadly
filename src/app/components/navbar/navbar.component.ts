import {Component, inject, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {User} from '../../core/types/User';
import {AuthService} from '../../core/service/auth-service';
import {BurgerButton} from '../burger-button/burger-button';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule, NgOptimizedImage, BurgerButton],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  user: User | null = null;
  openMenu = false;
  openDropdown = false;
  isAdminDropdownOpen = false;

  readonly adminLinks = [
    {label: 'Acesso Administrador', path: '/admin/login'},
    {label: 'Acesso Funcionário', path: '/employee/login'}
  ];

  ngOnInit(): void {
    this.user = this.authService.currentUser();
  }

  get isUserAdminOrEmployee(): boolean {
    if (!this.user) {
      return false;
    }
    return this.user.role === 'ADMIN' || this.user.role === 'EMPLOYEE';
  }

  handleKeydown(event: KeyboardEvent, action: () => void) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }

  goToHome() {
    this.router.navigate(['/app-home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/app-profile']);
  }

  goToEventsPage() {
    this.router.navigate(['/app-events']);
  }

  goToInstitutionPage() {
    this.router.navigate(['/app-institution']);
  }


  goToAboutUspage() {
    return this.router.navigate(['/about-us'])
  }

  goToCheckIn() {
    this.router.navigate(['/check-in']);
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.isAdminDropdownOpen = false;
  }

  isLoggedIn(): boolean {
    return this.authService.isLogged();
  }

  toggleUserDropdown() {
    this.openDropdown = !this.openDropdown;
    this.isAdminDropdownOpen = false;
  }

  toggleAdminDropdown() {
    this.isAdminDropdownOpen = !this.isAdminDropdownOpen;
    this.openDropdown = false;
  }

  toggleMobileMenu(): void {
    this.openMenu = !this.openMenu;
  }
}
