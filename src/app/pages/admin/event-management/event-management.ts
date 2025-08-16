import {Component, inject, OnInit} from '@angular/core';
import {EventAdminCard} from '../../../components/event-admin-card/event-admin-card';
import {EventService} from '../../../core/service/event-service';
import { Event } from '../../../core/types/Event';
import {Pagination} from '../../../core/types/Pagination';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {EventModalForm} from '../../../components/event-modal-form/event-modal-form';

@Component({
  selector: 'app-event-management',
  imports: [
    EventAdminCard,
    AsyncPipe,
    EventModalForm
  ],
  templateUrl: './event-management.html',
  styleUrl: './event-management.scss'
})
export class EventManagement implements OnInit {
  private assetService = inject(EventService);
  events$!: Observable<Pagination<Event>>;
  isModalVisible = false;
  selectedEvent: Event | null = null;

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.events$ = this.assetService.getAllEvents();
  }

  onAddEvent(): void {
    this.selectedEvent = null;
    this.isModalVisible = true;
  }

  onEventSelected(event: Event): void {
    const e = this.assetService.editEvent(event.id!, event);
    e.subscribe((event: Event) => {console.log(event);});
    this.selectedEvent = event;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  saveEvent(event: Event): void {
    const e = this.assetService.saveEvent(event);
    e.subscribe((event: Event) => {console.log(event);});
    this.closeModal();
    this.loadEvents();
  }
}
