import { Component, inject } from '@angular/core';
import {ToastService} from '../../core/service/toast-service';
import {ToastComponent} from '../toast/toast.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [
    ToastComponent,
    AsyncPipe
  ],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css'
})
export class ToastContainer {
  private readonly toastService = inject(ToastService);
  toasts$ = this.toastService.getToasts();

  onCloseToast(id: number): void {
    this.toastService.removeToast(id);
  }
}
