import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../types/User";
import { Auth } from "../types/User/auth";
import { tap } from 'rxjs/operators';
import { AuthResponse } from "../types/User/auth-response";

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    private readonly endpoint = 'http://localhost:8080/auth/login'
    private http = inject(HttpClient);
    private user: User | null = null;

    login(credentials : Auth)  {
        return this.http.post<AuthResponse>(this.endpoint, credentials)
        .pipe(
            tap((response : AuthResponse) => {
                localStorage.setItem('user', response.token);
                sessionStorage.setItem('user', response.token);
            })
        );
    }

    getUser() : User | null {
        if (this.user) return this.user;

        const local = localStorage.getItem('user');
        return local ? JSON.parse(local) : null;
    }   

    isLogged() {
        return !!localStorage.getItem('user');
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        sessionStorage.removeItem('user');
    }
}