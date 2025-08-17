import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Toast} from '../types/Toast';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts$ = new BehaviorSubject<Toast[]>([]);

  constructor() { }

  getToasts(): Observable<Toast[]> {
    return this.toasts$.asObservable();
  }

  showSuccess(message: string, duration = 5000): void {
    this.addToast({ message, type: 'success', duration });
  }

  showError(message: string, duration = 7000): void {
    this.addToast({ message, type: 'error', duration });
  }

  showInfo(message: string, duration = 5000): void {
    this.addToast({ message, type: 'info', duration });
  }

  private addToast(toast: Omit<Toast, 'id'>): void {
    const newToast: Toast = {
      id: Date.now() + Math.random(),
      ...toast
    };

    const currentToasts = this.toasts$.getValue();
    this.toasts$.next([...currentToasts, newToast]);
  }

  removeToast(id: number): void {
    const currentToasts = this.toasts$.getValue();
    const updatedToasts = currentToasts.filter(toast => toast.id !== id);
    this.toasts$.next(updatedToasts);
  }

}
