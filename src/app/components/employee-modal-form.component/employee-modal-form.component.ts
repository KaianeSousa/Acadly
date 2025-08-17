import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {Auth} from '../../core/types/User/auth';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { EmployeeRequest } from '../../core/types/Employee/request';

@Component({
  selector: 'app-employee-modal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-modal-form.component.html',
  styleUrl: './employee-modal-form.component.scss'
})
export class EmployeeModalFormComponent implements OnInit {
  @Input() isLoading: boolean = false;
  @Output() close = new EventEmitter<void>();
   @Output() save = new EventEmitter<EmployeeRequest>();
  @Input() employee : EmployeeRequest | null = null;

  employeeForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isEditMode = !!this.employee;

    this.employeeForm = this.fb.group({
      name: [this.employee?.name || '', Validators.required],
      email: [this.employee?.email || '', Validators.required],
      password: [this.employee?.password ?? true, Validators.required]
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
    this.close.emit();
  }
}