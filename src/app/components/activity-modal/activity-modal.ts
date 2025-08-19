import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Event} from '../../core/types/Event';
import {Activity} from '../../core/types/Activity';

@Component({
  selector: 'app-activity-modal',
  imports: [],
  templateUrl: './activity-modal.html',
  styleUrl: './activity-modal.scss'
})
export class ActivityModal {
  @Input() isVisible = false;

  @Input() activity: Activity | null = null;
  @Output() closeModal = new EventEmitter<void>();

  onClose(mouseEvent?: MouseEvent): void {
    if (mouseEvent && mouseEvent.target !== mouseEvent.currentTarget) {
      return;
    }
    this.closeModal.emit();
  }
}
