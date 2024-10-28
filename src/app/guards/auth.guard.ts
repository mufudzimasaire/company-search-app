import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // Replace with false to check the guard and error message
  const isAuthenticated = true;
  const router = inject(Router);

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate([''], { queryParams: { error: 'unauthorized' } });
    return false;
  }
};