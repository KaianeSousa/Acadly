import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../service/auth-service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole();
  if (userRole === 'ADMIN') {
    return true;
  } else {
    return router.createUrlTree(['/app-home']);
  }
};
