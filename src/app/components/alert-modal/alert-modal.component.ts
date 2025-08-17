import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  imports: [],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss'
})
export class AlertModalComponent {
  @Input() title: string = 'Atenção';
  @Input() message: string = 'Você tem certeza que deseja continuar?';
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() showCancelButton: boolean = true;
  @Output() close = new EventEmitter<boolean>();

  onConfirm(): void {
    this.close.emit(true);
  }

  onCancel(): void {
    this.close.emit(false);
  }
}
