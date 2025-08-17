
import { Injectable, inject, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { jwtDecode } from "jwt-decode";
import { tap } from "rxjs";
import {environment} from '../../../environment/enviroment';
import { Auth } from "../types/User/auth";
import { AuthResponse } from "../types/User/auth-response";
import { User } from "../types/User";

@Injectable({
    providedIn: 'root'
})

export class AuthEmployeeService {

    private readonly apiUrl = `${environment.apiUrl}/employee`;
    private http = inject(HttpClient);
    private readonly isBrowser : boolean;
    private user: User | null = null;
    
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        if (this.isBrowser) {
          const token = localStorage.getItem('token');
          if (token) {
            this.decodeAndSetUser(token);
          }
        }
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