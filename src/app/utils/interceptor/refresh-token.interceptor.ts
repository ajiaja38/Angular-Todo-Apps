import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../data/services/auth.service';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        console.log('Performing refreshToken request!');

        return authService.refreshToken().pipe(
          switchMap((response) => {
            const token: string = response.data.accessToken;
            req = req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
              },
            });
            return next(req);
          }),
          catchError((err) => {
            console.log(err.error.message);
            return throwError(() => new Error('Unauthorized Exception'));
          })
        );
      }

      return throwError(() => new Error('Unauthorized Exception'));
    })
  );
};
