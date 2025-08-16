import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Event } from '../../core/types/Event';

@Component({
  selector: 'app-event-admin-card',
  imports: [],
  templateUrl: './event-admin-card.html',
  styleUrl: './event-admin-card.scss'
})
export class EventAdminCard {
  @Input({ required: true }) event!: Event;
  @Output() cardClick = new EventEmitter<Event>();

  onCardClick(): void {
    this.cardClick.emit(this.event);
  }
}
