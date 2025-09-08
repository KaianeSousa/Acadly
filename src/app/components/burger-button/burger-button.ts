import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-burger-button',
  imports: [],
  templateUrl: './burger-button.html',
  styleUrl: './burger-button.scss'
})
export class BurgerButton {
  @Input() isOpen = false;
  @Output() toggled = new EventEmitter<void>();

  onClick(): void {
    this.toggled.emit();
  }
}
