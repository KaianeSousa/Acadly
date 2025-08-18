import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../service/auth-service';

export const employeeGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.userRole();
  if (userRole === 'EMPLOYEE' || userRole === 'ADMIN') {
    return true;
  } else {
    return router.createUrlTree(['/app-home']);
  }
};
