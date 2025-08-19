import {inject} from '@angular/core';
import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from '../service/auth-service';

export const redirectIfLoggedInGuard: CanActivateFn = (route, state): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    const userRole = authService.userRole();
    if (userRole === 'ADMIN') {
      return router.createUrlTree(['/admin']);
    }

    if (userRole === 'EMPLOYEE') {
      return router.createUrlTree(['/employee']);
    }

    return router.createUrlTree(['/']);
  }

  return true;
};
