import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../core/types/Employee';

@Component({
  selector: 'app-employee-admin-card',
  imports: [],
  templateUrl: './employee-admin-card.component.html',
  styleUrl: './employee-admin-card.component.scss'
})
export class EmployeeAdminCardComponent {
  @Input({ required: true }) employee!: Employee;
  @Output() cardClick = new EventEmitter<Employee>();
  @Output() deleteClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.employee);
  }
  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteClick.emit(this.employee.id!);
  }
}
