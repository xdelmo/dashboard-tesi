import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const publicGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Se sei già loggato, non hai motivo di vedere il login
    router.navigate(['/dashboard']);
    return false; // Blocca l'accesso alla pagina di login
  }

  // Se NON sei loggato, prego entra pure
  return true;
};
