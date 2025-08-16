import {Component, inject} from '@angular/core';
import {AuthService} from '../../../core/service/auth-service';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UpperCasePipe} from '@angular/common';
import {BurgerButton} from '../../../components/burger-button/burger-button';

@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    UpperCasePipe,
    BurgerButton
  ],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss'
})
export class AdminLayout {
  private authService = inject(AuthService);
  private router = inject(Router);
  isSidebarVisible = false;

  get userName(): string | null {
    return this.authService.getUser()?.name || null;
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
