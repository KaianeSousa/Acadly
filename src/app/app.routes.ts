import { Routes} from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import {CheckIn} from './pages/check-in/check-in';
import {AdminLogin} from './pages/admin-login/admin-login';
import { EmployeeLogin } from './pages/employee-login/employee-login';

export const routes: Routes = [
  { path: '', redirectTo: 'app-home', pathMatch: 'full' },
  {
    path: 'app-home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage)
  },
  { path: 'check-in', component: CheckIn, canActivate: [authGuard] },
  { path: 'admin/login', component: AdminLogin },
  { path: 'employee/login', component: EmployeeLogin },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'employee',
    loadChildren: () => import('./pages/admin/employee.routes').then(m => m.EMPLOYEE_ROUTES)
  },
]
