import { Component } from '@angular/core';
import { AboutUs } from '../../components/about-us/about-us.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AboutUs,

  ],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {}
