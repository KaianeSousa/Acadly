import { Component, Input, Output, OnInit, EventEmitter, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Employee } from '../../core/types/Employee';

@Component({
  selector: 'app-employee-modal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-modal-form.component.html',
  styleUrl: './employee-modal-form.component.scss'
})
export class EmployeeModalFormComponent implements OnInit {
  @Input() isLoading = false;
  @Output() modalClose = new EventEmitter<void>();
  @Output() save = new EventEmitter<Employee>();
  @Input() employee : Employee | null = null;

  isEditMode = false;
  employeeForm!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.isEditMode = !!this.employee;

    this.employeeForm = this.fb.group({
      id: [this.employee?.id || null],
      name: [this.employee?.name || '', Validators.required],
      email: [this.employee?.email || '', Validators.required],
      password: [
        '', 
        this.isEditMode ? [] : [Validators.required] 
      ]
        });
  }

  onSave(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.save.emit(this.employeeForm.value);
  }

  onClose(): void {
    this.modalClose.emit();
  }
}