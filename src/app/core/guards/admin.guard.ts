import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const messageService = inject(MessageService);

  if (authService.isAdmin()) {
    return true;
  } else {
    messageService.add({
      severity: 'error',
      summary: 'Accesso Negato',
      detail: 'Non hai i permessi per accedere a questa sezione.',
    });
    router.navigate(['/dashboard']);
    return false;
  }
};
