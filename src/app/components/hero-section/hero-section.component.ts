import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Event } from "../../core/types/Event";
import { EventService } from '../../core/service/event-service';
import { ModalComponent } from '../modal/modal.component';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [ModalComponent, NgOptimizedImage],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit {
  event?: Event;

  private eventService = inject(EventService);
  @ViewChild(ModalComponent) modal!: ModalComponent;

  openParticipantModal() {
    if (this.modal) {
      this.modal.openModal();
    }
  }

  onModalClose() {
  }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent() {
    this.eventService.getEvent().subscribe({
      next: (eventData) => {
        this.event = eventData;
      },
    });
  }
}

