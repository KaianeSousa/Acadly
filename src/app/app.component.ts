import { Component } from '@angular/core';
import { NavbarComponent } from './user/navbar/navbar.component';
import { PrimaryBannerComponent } from './user/primary-banner/primary-banner.component';
import { CardEventComponent } from './user/card-event/card-event.component';
import { CardsComponent } from './user/cards/cards.component';
import { SecundaryBannerComponent } from './user/secundary-banner/secundary-banner.component'
import { FormComponent } from './user/form/form.component';
import { FooterComponent } from './user/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    PrimaryBannerComponent,
    CardEventComponent,
    CardsComponent,
    SecundaryBannerComponent,
    FormComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}