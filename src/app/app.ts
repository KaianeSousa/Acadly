import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToastContainer} from './components/toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainer],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly title = signal('fintench-frontend');
}
