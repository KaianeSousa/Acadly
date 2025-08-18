import {HttpClient} from "@angular/common/http";
import {computed, inject, Injectable, PLATFORM_ID, signal} from "@angular/core";
import {User} from "../types/User";
import {Auth} from "../types/User/auth";
import {tap} from 'rxjs/operators';
import {AuthResponse} from "../types/User/auth-response";
import {environment} from '../../../environment/enviroment';
import {jwtDecode} from 'jwt-decode';
import {isPlatformBrowser} from '@angular/common';
import { DecodedToken } from "../types/Token";

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly adminApiUrl = `${environment.apiUrl}/auth/login`;
  private readonly employeeApiUrl = `${environment.apiUrl}/employee/auth`;
  private http = inject(HttpClient);
  private readonly isBrowser: boolean;
  private readonly platformId = inject(PLATFORM_ID);
  currentUser = signal<User | null>(null);

  isLogged = computed(() => !!this.currentUser());
  userRole = computed(() => this.currentUser()?.role ?? null);

  constructor() {
      this.isBrowser = isPlatformBrowser(this.platformId);
      if (this.isBrowser) {
          const token = localStorage.getItem('token');
          if (token) {
              this.decodeAndSetUser(token);
          }
      }
  }

  loginAdmin(credentials: Auth) {
    return this.http.post<AuthResponse>(this.adminApiUrl, credentials).pipe(
      tap(response => this.handleAuthSuccess(response.token))
    );
  }

  loginEmployee(credentials: Auth) {
    return this.http.post<AuthResponse>(this.employeeApiUrl, credentials).pipe(
      tap(response => this.handleAuthSuccess(response.token))
    );
  }

  private handleAuthSuccess(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
    this.decodeAndSetUser(token);
  }

  private decodeAndSetUser(token: string): void {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);

      this.currentUser.set({
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role
      });
    } catch {
      this.logout();
    }
  }

  logout(): void {
    this.currentUser.set(null);
    if (this.isBrowser) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }
}
