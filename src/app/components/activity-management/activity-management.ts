import {ChangeDetectorRef, Component, inject, Input, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, switchMap} from 'rxjs';
import {Activity} from '../../core/types/Activity';
import {Pagination} from '../../core/types/Pagination';

import {CommonModule} from '@angular/common';

import {AlertModalComponent} from '../alert-modal/alert-modal.component';
import {ActivityService} from '../../core/service/activity-service';
import {ToastService} from '../../core/service/toast-service';
import {ActivityModalForm} from '../activity-modal-form/activity-modal-form';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-activity-management',
  imports: [
    CommonModule,
    AlertModalComponent,
    ActivityModalForm
  ],
  templateUrl: './activity-management.html',
  styleUrls: ['./activity-management.scss']
})
export class ActivityManagement implements OnInit {
  @Input({required: true}) eventId!: number;

  private activityService = inject(ActivityService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  pageSize = 5;
  private page$ = new BehaviorSubject<number>(0);
  private refresh$ = new BehaviorSubject<void>(undefined);

  activities$!: Observable<Pagination<Activity>>;

  isFormModalVisible = false;
  isAlertModalVisible = false;
  selectedActivity: Activity | null = null;
  private activityIdToDelete: number | null = null;

  ngOnInit(): void {
    this.activities$ = combineLatest([this.page$, this.refresh$]).pipe(
      switchMap(([page]) =>
        this.activityService.getAllActivitiesByEvent(this.eventId, page as number, this.pageSize)
      )
    );
  }

  private refreshData(): void {
    this.refresh$.next();
  }

  onAddActivity(): void {
    this.selectedActivity = null;
    this.isFormModalVisible = true;
    this.cdr.detectChanges();
  }

  onEditActivity(activity: Activity): void {
    this.selectedActivity = {...activity};
    this.isFormModalVisible = true;
    this.cdr.detectChanges();
  }

  onDeleteActivity(id: number): void {
    this.activityIdToDelete = id;
    this.isAlertModalVisible = true;
  }

  closeFormModal(): void {
    this.isFormModalVisible = false;
    this.selectedActivity = null;
  }

  saveActivity(activity: Activity): void {
    this.activityService.saveActivity(activity, this.eventId).subscribe({
      next: () => {
        const message = activity.id ? 'Atividade atualizada!' : 'Atividade criada!';
        this.toastService.showSuccess(message);
        this.closeFormModal();
        this.refreshData();
      },
      error: (err: HttpErrorResponse) => {
        let errorMessage = 'Falha ao salvar atividade.';

        if (err.error && typeof err.error === 'string') {
          try {
            const errorObj = JSON.parse(err.error);

            if (errorObj && errorObj.message) {
              errorMessage = errorObj.message;
            }
          } catch {
            errorMessage = err.error;
          }
        }

        this.toastService.showError(errorMessage);
      }
    });
  }

  handleAlertClose(confirmed: boolean): void {
    this.isAlertModalVisible = false;
    if (confirmed && this.activityIdToDelete) {
      this.activityService.deleteActivity(this.activityIdToDelete).subscribe({
        next: () => {
          this.toastService.showSuccess('Atividade excluída com sucesso.');
          this.refreshData();
        },
        error: (err) => this.toastService.showError(err.error?.message || 'Falha ao excluir atividade.')
      });
    }
    this.activityIdToDelete = null;
  }

  nextPage(currentPage: number, totalPages: number): void {
    if (currentPage < totalPages - 1) {
      this.page$.next(currentPage + 1);
    }
  }

  previousPage(currentPage: number): void {
    if (currentPage > 0) {
      this.page$.next(currentPage - 1);
    }
  }
}
