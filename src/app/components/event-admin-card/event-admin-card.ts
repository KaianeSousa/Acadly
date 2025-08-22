import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Event } from '../../core/types/Event';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-event-admin-card',
  imports: [
    NgClass,
    DatePipe
  ],
  templateUrl: './event-admin-card.html',
  styleUrl: './event-admin-card.scss'
})
export class EventAdminCard {
  @Input({ required: true }) event!: Event;
  @Output() cardClick = new EventEmitter<Event>();
  @Output() deleteClick = new EventEmitter<number>();

  onCardClick(): void {
    this.cardClick.emit(this.event);
  }

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteClick.emit(this.event.id!);
  }
}
