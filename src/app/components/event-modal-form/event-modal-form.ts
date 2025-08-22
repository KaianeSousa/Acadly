import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Event} from '../../core/types/Event';

@Component({
  selector: 'app-event-modal-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './event-modal-form.html',
  styleUrl: './event-modal-form.scss'
})
export class EventModalForm implements OnInit {
  @Input() event: Event | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<Event>();

  eventForm!: FormGroup;
  isEditMode = false;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.isEditMode = !!this.event;

    this.eventForm = this.fb.group({
      id: [this.event?.id || null],
      name: [this.event?.name || '', Validators.required],
      description: [this.event?.description || '', Validators.required],
      initialDateTime: [this.event?.initialDateTime, Validators.required],
      finalDateTime: [this.event?.finalDateTime, Validators.required],
      local: [this.event?.local || '', Validators.required],
      workload: [this.event?.workload || '', [Validators.required, Validators.min(1)]],
      isActive: [this.event?.isActive ?? true, Validators.required]
    });
  }

  onSave(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }
    this.save.emit(this.eventForm.value);
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
