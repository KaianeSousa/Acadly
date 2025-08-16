import {HttpClient} from "@angular/common/http";
import {Inject, inject, Injectable, PLATFORM_ID} from "@angular/core";
import {User} from "../types/User";
import {Auth} from "../types/User/auth";
import {tap} from 'rxjs/operators';
import {AuthResponse} from "../types/User/auth-response";
import {environment} from '../../../environment/enviroment';
import {jwtDecode} from 'jwt-decode';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth/login`;
  private http = inject(HttpClient);
  private user: User | null = null;
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      const token = localStorage.getItem('token');
      if (token) {
        this.decodeAndSetUser(token);
      }
    }
  }

  login(credentials: Auth) {
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

  private decodeAndSetUser(token: string): void {
    try {
      const decodedToken: any = jwtDecode(token);
      this.user = {
        name: decodedToken.name,
        email: decodedToken.sub,
        role: decodedToken.role.toUpperCase()
      };
    } catch (error) {
      console.error("Failed to decode token", error);
      this.logout();
    }
  }

  getUser(): User | null {
    return this.user;
  }

  getUserRole(): string | null {
    if (this.user && this.user.role) {
      return this.user.role;
    }
    return null;
  }

  isLogged(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  logout(): void {
    this.user = null;
    if (this.isBrowser) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  }
}
