import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  imports: [],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.scss'
})
export class AlertModalComponent {
  @Input() title = 'Atenção';
  @Input() message = 'Você tem certeza que deseja continuar?';
  @Input() confirmText = 'Confirmar';
  @Input() cancelText = 'Cancelar';
  @Input() showCancelButton = true;
  @Output() modalClose = new EventEmitter<boolean>();

  onConfirm(): void {
    this.modalClose.emit(true);
  }

  onCancel(): void {
    this.modalClose.emit(false);
  }
}
