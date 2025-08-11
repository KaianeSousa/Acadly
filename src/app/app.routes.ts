import { Routes} from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'app-home', pathMatch: 'full'},
  {
    path: 'app-home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage)
  },
]
