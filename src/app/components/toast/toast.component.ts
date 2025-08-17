import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Toast} from '../../core/types/Toast';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {NgClass} from '@angular/common';


@Component({
  selector: 'app-toast',
  imports: [
    NgClass
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ])
  ]
})
export class ToastComponent implements OnInit{
  @Input() toast!: Toast;
  @Output() close = new EventEmitter<number>();

  ngOnInit(): void {
    if (this.toast.duration) {
      setTimeout(() => this.onClose(), this.toast.duration);
    }
  }

  onClose(): void {
    this.close.emit(this.toast.id);
  }

  get toastClasses(): { [key: string]: boolean } {
    return {
      'toast': true,
      [`toast--${this.toast.type}`]: true
    };
  }
}
