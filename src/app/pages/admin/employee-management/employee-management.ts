import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Pagination } from '../../../core/types/Pagination';
import { EmployeeAdminCardComponent } from '../../../components/employee-admin-card/employee-admin-card.component';
import { EmployeeService } from '../../../core/service/employee-service';
import { Employee } from '../../../core/types/Employee';
import { EmployeeRequest } from '../../../core/types/Employee/request';
import { EmployeeModalFormComponent } from '../../../components/employee-modal-form.component/employee-modal-form.component';

@Component({
  selector: 'app-employee-management',
  standalone: true,
  imports: [AsyncPipe, EmployeeAdminCardComponent, EmployeeModalFormComponent],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.scss'
})
export class EmployeeManagement {
  private employeeService = inject(EmployeeService);
  
  employees$!: Observable<Pagination<Employee>>;
  isModalVisible = false;
  selectedEmployee: EmployeeRequest | null = null;

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees$ = this.employeeService.getAllEmployees();
  }

  onAddEmployee(): void {
    this.selectedEmployee = {
      name: '',
      email: '',
      password: ''
    };
    this.isModalVisible = true;
  }

  onEmployeeSelected(employee: Employee): void {
    this.selectedEmployee = {
      name: employee.name,
      email: employee.email,
      password: '' 
    };
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedEmployee = null;
  }

  saveEmployee(employeeRequest: EmployeeRequest): void {
    if (employeeRequest.email) {
      const updatePayload = {
        name: employeeRequest.name,
        email: employeeRequest.email
      };
      
      this.employeeService.updateEmployee(employeeRequest.email, updatePayload)
        .subscribe({
          next: () => {
            this.closeModal();
            this.loadEmployees();
          },
          error: (err) => console.error('Erro ao atualizar funcionário:', err)
        });
    } else {
      this.employeeService.saveEmployee(employeeRequest)
        .subscribe({
          next: () => {
            this.closeModal();
            this.loadEmployees();
          },
          error: (err) => console.error('Erro ao criar funcionário:', err)
        });
    }
  }
}

/*
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Pagination } from '../../../core/types/Pagination';
import { EmployeeAdminCardComponent } from '../../../components/employee-admin-card/employee-admin-card.component';
import { EmployeeService } from '../../../core/service/employee-service';
import { Employee } from '../../../core/types/Employee';
import { EmployeeRequest } from '../../../core/types/Employee/request';
import { EmployeeModalFormComponent } from '../../../components/employee-modal-form.component/employee-modal-form.component';

@Component({
  selector: 'app-employee-management',
  imports: [  AsyncPipe,
    EmployeeAdminCardComponent,
  EmployeeModalFormComponent ],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.scss'
})
export class EmployeeManagement {
  private employeeService = inject(EmployeeService);
  employees$!: Observable<Pagination<Employee>>;
  isModalVisible = false;
  selectedEmployee: Employee | null = null;

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees$ = this.employeeService.getAllEmployees();
  }

  onAddEmployee(): void {
    this.selectedEmployee = null;
    this.isModalVisible = true;
  }

  onEmployeeSelected(employee: EmployeeRequest): void {
    const e = this.employeeService.updateEmployee(employee.email!, employee);
    e.subscribe((employee: Employee) => {console.log(employee);});
    this.selectedEmployee = employee;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveEmployee(employee: EmployeeRequest): void {
    const e = this.employeeService.saveEmployee(employee);
    e.subscribe((employee: EmployeeRequest) => {console.log(employee);});
    this.closeModal();
    this.loadEmployees();
  }
}
*/