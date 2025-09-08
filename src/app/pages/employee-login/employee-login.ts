import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { Auth } from '../../core/types/User/auth';
import { AuthForm } from '../../components/auth-form/auth-form';
import {AuthService} from '../../core/service/auth-service';

@Component({
  selector: 'app-employee-login',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    AuthForm
  ],
  templateUrl: './employee-login.html',
  styleUrl: './employee-login.scss'
})

export class EmployeeLogin implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  auth: Auth = { email: '', password: '' };

  loginForm!: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  handleLoginSubmit(credentials: Auth): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.authService.loginEmployee(credentials).subscribe({
      next: () => {
        this.router.navigate(['/employee']);
      },
      error: (err) => {
        this.errorMessage = 'E-mail ou senha inválidos. Tente novamente.';
        this.isLoading = false;
        console.error('Login failed', err);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

}

