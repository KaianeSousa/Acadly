import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { Event } from "../../core/types/Event";
import { EventService } from '../../core/service/event-service';
import { ModalComponent } from '../modal/modal.component';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {catchError, Observable, of} from 'rxjs';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [NgOptimizedImage, ModalComponent, AsyncPipe],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss'
})
export class HeroSectionComponent implements OnInit {
  event$!: Observable<Event | null>;

  private eventService = inject(EventService);
  @ViewChild(ModalComponent) modal!: ModalComponent;

  openParticipantModal() {
    if (this.modal) {
      this.modal.openModal();
    }
  }

 /* onModalClose() {
  } */

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent() {
    // 6. Atribuir o Observable diretamente e tratar erros
    this.event$ = this.eventService.getEvent().pipe(
      catchError(error => {
        // Se a API retornar um erro (ex: 404 Not Found),
        // o console mostrará o erro, e retornaremos um observable com 'null'.
        console.error('Nenhum evento ativo encontrado ou falha na API:', error);
        return of(null);
      })
    );
  }
}
