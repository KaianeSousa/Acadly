import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { NgSelectModule } from '@ng-select/ng-select';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../components/footer/footer.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ListCardsComponent } from '../../components/list-cards/list-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    HeroSectionComponent, 
    ListCardsComponent
],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
 
}
