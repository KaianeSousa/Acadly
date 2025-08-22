import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {EventService} from '../../../core/service/event-service';
import {AsyncPipe, DatePipe} from '@angular/common';
import {Event} from '../../../core/types/Event';
import {EventModalForm} from '../../../components/event-modal-form/event-modal-form';
import {ToastService} from '../../../core/service/toast-service';
import {ActivityManagement} from '../../../components/activity-management/activity-management';
import {Participant} from '../../../core/types/Participant';
import {Pagination} from '../../../core/types/Pagination';

@Component({
  selector: 'app-event-detail',
  imports: [
    AsyncPipe,
    RouterLink,
    EventModalForm,
    ActivityManagement,
    DatePipe
  ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss'
})
export class EventDetail implements OnInit {
  private eventService = inject(EventService);
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);

  event$!: Observable<Event>;
  isModalVisible = false;

  selectedEventForEdit: Event | null = null;
  private eventId!: number;

  participants: Participant[] = [];
  isLoadingParticipants = false;
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  pageSize = 10;

  ngOnInit(): void {
    const eventIdParam = this.route.snapshot.paramMap.get('id');
    if (eventIdParam) {
      this.eventId = +eventIdParam;
      this.loadEvent();
      this.loadParticipants(this.currentPage);
    }
  }

  loadEvent(): void {
    this.event$ = this.eventService.getEventById(this.eventId);
    this.cdr.detectChanges();
  }

  loadParticipants(page: number): void {
    this.isLoadingParticipants = true;
    this.eventService.getParticipantsByEvent(this.eventId, page, this.pageSize).subscribe({
      next: (response: Pagination<Participant>) => {
        this.participants = response.data;
        this.currentPage = response.pagination.page;
        this.totalPages = response.pagination.totalPages;
        this.totalElements = response.pagination.totalElements;
        this.isLoadingParticipants = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastService.showError('Falha ao carregar os participantes.');
        this.isLoadingParticipants = false;
      }
    });
  }

  onEditEvent(event: Event): void {
    this.selectedEventForEdit = {...event};
    this.isModalVisible = true;
  }

  saveEvent(event: Event): void {
    this.eventService.saveEvent(event).subscribe({
      next: () => {
        this.toastService.showSuccess('Evento atualizado com sucesso!');
        this.closeModal();
        this.loadEvent();
      },
      error: (err) => {
        this.toastService.showError(err.error?.message || 'Falha ao salvar o evento. Tente novamente.');
      }
    });
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedEventForEdit = null;
    this.cdr.detectChanges();
  }

  onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.loadParticipants(newPage);
    }
  }
}
