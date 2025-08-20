import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {EventAdminCard} from '../../../components/event-admin-card/event-admin-card';
import {EventService} from '../../../core/service/event-service';
import {Event} from '../../../core/types/Event';
import {Pagination} from '../../../core/types/Pagination';
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, Observable, switchMap} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {EventModalForm} from '../../../components/event-modal-form/event-modal-form';
import {AlertModalComponent} from '../../../components/alert-modal/alert-modal.component';
import {ToastService} from '../../../core/service/toast-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-event-management',
  imports: [
    EventAdminCard,
    AsyncPipe,
    AlertModalComponent,
    EventModalForm
  ],
  templateUrl: './event-management.html',
  styleUrl: './event-management.scss'
})
export class EventManagement {
  private eventService = inject(EventService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);
  pageSize = 8;

  private page$ = new BehaviorSubject<number>(0);
  private query$ = new BehaviorSubject<string>('');

  events$: Observable<Pagination<Event>> = combineLatest([
    this.page$,
    this.query$.pipe(
      debounceTime(300), distinctUntilChanged())
  ]).pipe(
    switchMap(([currentPage, currentQuery]) =>
      this.eventService.getAllEvents(currentPage as number, this.pageSize, currentQuery as string)
    )
  );

  isModalVisible = false;
  selectedEvent: Event | null = null;
  isAlertVisible = false;
  private eventIdToDelete: number | null = null;

  onSearchQueryChanged(query: string): void {
    if (this.page$.value !== 0) {
      this.page$.next(0);
    }
    this.query$.next(query);
  }

  private refreshData(): void {
    this.page$.next(this.page$.value);
  }

  onAddEvent(): void {
    this.selectedEvent = null;
    this.isModalVisible = true;
  }

  onEventSelected(event: Event): void {
    this.selectedEvent = event;
    this.router.navigate(['/admin/events', event.id]);
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveEvent(event: Event): void {
    this.eventService.saveEvent(event).subscribe({
      next: () => {
        const message = event.id ? 'Evento atualizado com sucesso!' : 'Evento criado com sucesso!';
        this.toastService.showSuccess(message);

        this.refreshData();
        this.closeModal();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toastService.showError(err.error?.message || 'Falha ao salvar o evento. Tente novamente.')
      }
    });
  }

  deleteEvent(id: number): void {
    this.eventIdToDelete = id;
    this.isAlertVisible = true;
  }

  handleAlertClose(confirmed: boolean): void {
    this.isAlertVisible = false;
    if (confirmed && this.eventIdToDelete !== null) {
      this.eventService.deleteEvent(this.eventIdToDelete).subscribe({
        next: () => {
          this.toastService.showSuccess('Evento excluído com sucesso.');
          this.refreshData();
          this.cdr.detectChanges();
        },
        error: (err) =>
          this.toastService.showError(err.error?.message || 'Falha ao excluir o evento. Tente novamente.')

      });
    }
    this.eventIdToDelete = null;
  }

  goToPage(page: number): void {
    this.page$.next(page);
  }

  nextPage(currentPage: number, totalPages: number): void {
    if (currentPage < totalPages - 1) {
      this.goToPage(currentPage + 1);
    }
  }

  previousPage(currentPage: number): void {
    if (currentPage > 0) {
      this.goToPage(currentPage - 1);
    }
  }
}
