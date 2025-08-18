import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {EmployeeAdminCardComponent} from '../../../components/employee-admin-card/employee-admin-card.component';
import {EmployeeService} from '../../../core/service/employee-service';
import {Employee} from '../../../core/types/Employee';
import {Pagination} from '../../../core/types/Pagination';
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {EmployeeModalFormComponent} from '../../../components/employee-modal-form.component/employee-modal-form.component';
import {AlertModalComponent} from '../../../components/alert-modal/alert-modal.component';
import {ToastService} from '../../../core/service/toast-service';

@Component({
  selector: 'app-employee-management',
  imports: [
    EmployeeAdminCardComponent,
    AsyncPipe,
    EmployeeModalFormComponent,
    AlertModalComponent
  ],
  templateUrl: './employee-management.html',
  styleUrl: './employee-management.scss'
})
export class EmployeeManagement {
  private employeeService = inject(EmployeeService);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);
  pageSize = 8;

  private page$ = new BehaviorSubject<number>(0);
  private query$ = new BehaviorSubject<string>('');

  employees$: Observable<Pagination<Employee>> = combineLatest([
    this.page$,
    this.query$.pipe(debounceTime(300), distinctUntilChanged())
  ]).pipe(
    switchMap(([currentPage, currentQuery]) =>
      this.employeeService.getAllEmployees(currentPage as number, this.pageSize, currentQuery as string)
    )
  );

  isModalVisible = false;
  selectedEmployee: Employee | null = null;
  isAlertVisible = false;
  private employeeIdToDelete: number | null = null;

  onSearchQueryChanged(query: string): void {
    if (this.page$.value !== 0) this.page$.next(0);
    this.query$.next(query);
  }

  private refreshData(): void {
    this.page$.next(this.page$.value);
  }

  onAddEmployee(): void {
    this.selectedEmployee = null;
    this.isModalVisible = true;
  }

  onEmployeeSelected(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveEmployee(employee: Employee): void {
    this.employeeService.saveEmployee(employee).subscribe({
      next: () => {
        const message = employee.id ? 'Funcionário atualizado com sucesso!' : 'Funcionário criado com sucesso!';
        this.toastService.showSuccess(message);

        this.refreshData();
        this.closeModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toastService.showError(err.error?.message || 'Falha ao salvar funcionário. Tente novamente.');
      }
    });
  }

  deleteEmployee(id: number): void {
    this.employeeIdToDelete = id;
    this.isAlertVisible = true;
  }

  handleAlertClose(confirmed: boolean): void {
    this.isAlertVisible = false;
    if (confirmed && this.employeeIdToDelete !== null) {
      this.employeeService.deleteEmployee(this.employeeIdToDelete).subscribe({
        next: () => {
          this.toastService.showSuccess('Funcionário excluído com sucesso.');
          this.refreshData();
          this.cdr.detectChanges();
        },
        error: (err) =>
          this.toastService.showError(err.error?.message || 'Falha ao excluir funcionário. Tente novamente.')
      });
    }
    this.employeeIdToDelete = null;
  }

  goToPage(page: number): void {
    this.page$.next(page);
  }

  nextPage(currentPage: number, totalPages: number): void {
    if (currentPage < totalPages - 1) this.goToPage(currentPage + 1);
  }

  previousPage(currentPage: number): void {
    if (currentPage > 0) this.goToPage(currentPage - 1);
  }
}
