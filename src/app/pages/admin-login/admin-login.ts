import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../core/service/auth-service';
import {Auth} from '../../core/types/User/auth';
import {NgOptimizedImage} from '@angular/common';
import {AuthForm} from '../../components/auth-form/auth-form';
import {ToastService} from '../../core/service/toast-service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    AuthForm
  ],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss'
})
export class AdminLogin implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

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

    this.authService.loginAdmin(credentials).subscribe({
      next: () => {
        this.toastService.showSuccess('Login realizado com sucesso!');
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.toastService.showError('E-mail ou senha inválidos. Tente novamente.');

        this.isLoading = false;
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
