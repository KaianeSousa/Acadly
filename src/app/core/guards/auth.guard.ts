import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../service/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole();
  if (userRole === 'ADMIN' || userRole === 'EMPLOYEE') {
    return true;
  } else {
    return router.createUrlTree(['/app-home']);
  }
};
