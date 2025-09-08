import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Event } from "../../core/types/Event";
import { EventService } from '../../core/service/event-service';
import { ModalComponent } from '../modal/modal.component';
import {AsyncPipe, DatePipe, NgOptimizedImage} from '@angular/common';
import {catchError, map, Observable, of, startWith} from 'rxjs';

interface EventState {
  loading: boolean;
  event: Event | null;
}


@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgOptimizedImage, ModalComponent, AsyncPipe, DatePipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit {
  eventState$!: Observable<EventState>;

  private eventService = inject(EventService);
  @ViewChild(ModalComponent) modal!: ModalComponent;

  openParticipantModal() {
    if (this.modal) {
      this.modal.openModal();
    }
  }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent() {
    this.eventState$ = this.eventService.getEvent().pipe(
      map(eventData => ({ loading: false, event: eventData })),
      startWith({ loading: true, event: null }),
      catchError(() => of({ loading: false, event: null }))
    );
  }

}
