import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { APP_CONSTANTS } from '../constants/app.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    // Clona la richiesta e aggiungi l'header Authorization usando la costante
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${APP_CONSTANTS.AUTH.MOCK_TOKEN_VALUE}`,
      },
    });
    return next(clonedReq);
  }

  return next(req);
};
