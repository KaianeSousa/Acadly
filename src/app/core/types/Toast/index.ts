export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration?: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
