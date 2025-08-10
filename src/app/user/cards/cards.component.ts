import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { CommonModule } from '@angular/common';

register();

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardsComponent {
  cards = [
    { title: 'Card 1', text: 'Conteúdo do card 1.' },
    { title: 'Card 2', text: 'Conteúdo do card 2.' },
    { title: 'Card 3', text: 'Conteúdo do card 3.' },
    { title: 'Card 4', text: 'Conteúdo do card 4.' },
    { title: 'Card 5', text: 'Conteúdo do card 5.' }
  ];

  breakpoints = JSON.stringify({
    320: { slidesPerView: 1, spaceBetween: 8 },
    768: { slidesPerView: 2, spaceBetween: 12 },
    992: { slidesPerView: 3, spaceBetween: 16 }
  });
}