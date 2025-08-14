import { Routes} from '@angular/router';
import {CheckIn} from './pages/check-in/check-in';

export const routes: Routes = [
  { path: '', redirectTo: 'app-home', pathMatch: 'full'},
  {
    path: 'app-home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage)
  },
  { path: 'check-in', component: CheckIn }
]
