import { Routes } from '@angular/router';
import {adminGuard} from '../../core/guards/admin.guard';
import {AdminLayout} from './admin-layout/admin-layout';
import {EventManagement} from './event-management/event-management';
import {EmployeeManagement} from './employee-management/employee-management';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayout,
    canActivate: [adminGuard],
    children: [
      { path: '', redirectTo: 'events', pathMatch: 'full' },
      { path: 'events', component: EventManagement },
      { path: 'employees', component: EmployeeManagement }
    ]
  }
];
