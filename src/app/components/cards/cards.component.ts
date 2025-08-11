import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { Activity } from '../../core/types/Activity';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [ CommonModule, NgSelectModule, FormsModule ],
  templateUrl: 'cards.component.html',
  styleUrls: ['cards.component.scss']
})

export class CardsComponent {
  @Input() activity!: Activity;
}