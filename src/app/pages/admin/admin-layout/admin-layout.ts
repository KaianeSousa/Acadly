import {Component, computed, inject} from '@angular/core';
import {AuthService} from '../../../core/service/auth-service';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgOptimizedImage, UpperCasePipe} from '@angular/common';
import {BurgerButton} from '../../../components/burger-button/burger-button';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    UpperCasePipe,
    BurgerButton,
    NgOptimizedImage
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  private authService = inject(AuthService);
  private router = inject(Router);
  isSidebarVisible = false;

  userRole = this.authService.userRole;

  userName = computed(() => this.authService.currentUser()?.name);

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  adminLinks = [
    { path: 'events', label: 'Gerenciar Eventos', svg: 'assets/svg/events.svg' },
    { path: 'employees', label: 'Gerenciar Funcionários', svg: 'assets/svg/employees.svg' },
    { path: 'qrcode', label: 'Check-in QRCode', svg: 'assets/svg/qrcode.svg' },
    { path: 'numeric-code', label: 'Check-in por Código', svg: 'assets/svg/code.svg' }
  ];

  employeeLinks = [
    { path: 'qrcode', label: 'Check-in QRCode', svg: 'assets/svg/qrcode.svg' },
    { path: 'numeric-code', label: 'Check-in por Código', svg: 'assets/svg/code.svg' }
  ];

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
