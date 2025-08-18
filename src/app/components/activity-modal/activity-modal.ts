import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-activity-modal',
  imports: [],
  templateUrl: './activity-modal.html',
  styleUrl: './activity-modal.scss'
})
export class ActivityModal {
  @Input() isVisible = false;
  @Input() title = '';
  @Input() content = '';

  @Output() closeModal = new EventEmitter<void>();

  onClose(event?: MouseEvent): void {
    if (event && event.target !== event.currentTarget) {
      return;
    }

    this.isVisible = false;
  }
}
