import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Si è verificato un errore sconosciuto';
      let errorSummary = 'Errore';

      // Gestione base dei codici di errore HTTP
      if (error.status === 0) {
        // Errore Client-side o di Rete
        errorSummary = 'Errore di Connessione';
        errorMessage =
          'Impossibile contattare il server. Verifica la tua connessione.';
      } else if (error.status === 401) {
        errorSummary = 'Non Autorizzato';
        errorMessage = 'Sessione scaduta o credenziali non valide.';
      } else if (error.status === 403) {
        errorSummary = 'Accesso Negato';
        errorMessage = 'Non hai i permessi per eseguire questa azione.';
      } else if (error.status === 404) {
        errorSummary = 'Non Trovato';
        errorMessage = 'La risorsa richiesta non è stata trovata.';
      } else if (error.status >= 500) {
        errorSummary = 'Errore Server';
        errorMessage =
          'Il server ha riscontrato un problema. Riprova più tardi.';
      }

      // Mostra la notifica Toast
      messageService.add({
        severity: 'error',
        summary: errorSummary,
        detail: errorMessage,
        life: 5000, // durata 5 secondi
      });

      // Rilancia l'errore per permettere ai componenti di gestirlo se necessario
      return throwError(() => error);
    })
  );
};
