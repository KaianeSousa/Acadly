import { Component } from '@angular/core';
import { AboutUs } from '../../components/about-us/about-us.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    AboutUs,
    FooterComponent,
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {}
