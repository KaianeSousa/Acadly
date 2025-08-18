import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Activity} from '../../core/types/Activity';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-activity-modal-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './activity-modal-form.html',
  styleUrl: './activity-modal-form.scss'
})
export class ActivityModalForm implements OnInit{
  @Input() activity: Activity | null = null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() save = new EventEmitter<Activity>();

  activityForm!: FormGroup;
  isEditMode = false;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.isEditMode = !!this.activity;

    this.activityForm = this.fb.group({
      id: [this.activity?.id || null],
      name: [this.activity?.name || '', Validators.required],
      description: [this.activity?.description || '', Validators.required],
      dateTime: [this.activity?.dateTime || '', Validators.required],
      duration: [this.activity?.duration || '', [Validators.required, Validators.min(1)]],
      local: [this.activity?.local || '', Validators.required],
    });
  }

  onSave(): void {
    if (this.activityForm.invalid) {
      this.activityForm.markAllAsTouched();
      return;
    }
    this.save.emit(this.activityForm.value);
  }

  onClose(event?: MouseEvent): void {
    if (event) {
      if (event.target !== event.currentTarget) {
        this.closeModal.emit();
        return;
      }
    }
  }
}
