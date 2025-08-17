import { Component } from '@angular/core';
import {ToastService} from '../../core/service/toast-service';
import {ToastComponent} from '../toast/toast.component';
import {AsyncPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Toast} from '../../core/types/Toast';

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
  toasts$: Observable<Toast[]>;

  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.getToasts();

  }

  onCloseToast(id: number): void {
    this.toastService.removeToast(id);
  }
}
