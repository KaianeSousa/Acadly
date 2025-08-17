import { Component } from '@angular/core';
import {CheckInScanner} from '../../components/check-in-scanner/check-in-scanner';

@Component({
  selector: 'app-check-in',
  imports: [
    CheckInScanner,
  ],
  templateUrl: './check-in.html',
  styleUrl: './check-in.scss'
})
export class CheckIn {
}
