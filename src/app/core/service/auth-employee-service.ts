import { Injectable, inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { jwtDecode } from "jwt-decode";
import { tap } from "rxjs";
import { environment } from '../../../environment/enviroment';
import { Auth } from "../types/User/auth";
import { AuthResponse } from "../types/User/auth-response";
import { User } from "../types/User";
import { DecodedToken } from "../types/Token";

@Injectable({
  providedIn: 'root'
})
export class AuthEmployeeService {
  private readonly apiUrl = `${environment.apiUrl}/employee/auth`;
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private user: User | null = null; 

  constructor() {
    this.initializeUser();
  }

  authEmployee(credentials: Auth) {
    return this.http.post<AuthResponse>(this.apiUrl, credentials)
      .pipe(
        tap((response: AuthResponse) => {
          if (this.isBrowser) {
            localStorage.setItem('token', response.token);
            sessionStorage.setItem('token', response.token);
          }
          this.decodeAndSetUser(response.token);
        })
      );
  }

  private initializeUser(): void {
    if (this.isBrowser) {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        this.decodeAndSetUser(token);
      }
    }
  }

  private decodeAndSetUser(token: string): void {
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      
      if (!decodedToken.name || !decodedToken.email || !decodedToken.role) {
        throw new Error('Token structure is invalid');
      }

      this.user = {
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role
      };
    } catch {
      this.logout();
    }
  }

  getUser(): User | null {
    return this.user;
  }

  getUserRole(): string | null {
    return this.user?.role ?? null;
  }

  isLogged(): boolean {
    if (!this.isBrowser) return false;
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }

  logout(): void {
    this.user = null;
    if (this.isBrowser) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }
}