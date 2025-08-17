import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Auth} from '../../core/types/User/auth';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss'
})
export class AuthForm implements OnInit {
  @Input() isLoading = false;
  @Input() errorMessage: string | null = null;
  @Input() submitLabel = 'Entrar';
  @Output() formSubmit = new EventEmitter<Auth>();

  authForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }
    this.formSubmit.emit(this.authForm.value);
  }

}
