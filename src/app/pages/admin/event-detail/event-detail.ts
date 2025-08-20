import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {EventService} from '../../../core/service/event-service';
import {AsyncPipe} from '@angular/common';
import {Event} from '../../../core/types/Event';
import {EventModalForm} from '../../../components/event-modal-form/event-modal-form';
import {ToastService} from '../../../core/service/toast-service';
import {ActivityManagement} from '../../../components/activity-management/activity-management';

@Component({
  selector: 'app-event-detail',
  imports: [
    AsyncPipe,
    RouterLink,
    EventModalForm,
    ActivityManagement,
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

  ngOnInit(): void {
    const eventIdParam = this.route.snapshot.paramMap.get('id');
    if (eventIdParam) {
      this.eventId = +eventIdParam;
      this.loadEvent();
    }
  }

  loadEvent(): void {
    this.event$ = this.eventService.getEventById(this.eventId);
    this.cdr.detectChanges();
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
}
