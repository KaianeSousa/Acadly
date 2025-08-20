import {Component, EventEmitter, Input, Output} from '@angular/core';
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

  onClose(): void {
    this.closeModal.emit();
  }
}
