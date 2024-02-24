import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLogin: boolean = localStorage.getItem('accessToken') ? true : false;
  const router: Router = inject(Router);

  if (!isLogin) {
    router.navigateByUrl('/');
    return false;
  }

  return isLogin;
};
