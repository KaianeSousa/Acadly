import { Component } from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {RouterOutlet} from '@angular/router';
import {ToastContainer} from '../../components/toast-container/toast-container';
import {FooterComponent} from '../../components/footer/footer.component';

@Component({
  selector: 'app-public-layout',
  imports: [
    NavbarComponent,
    RouterOutlet,
    ToastContainer,
    FooterComponent
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss'
})
export class PublicLayout {

}
