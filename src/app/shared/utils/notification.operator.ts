import { MessageService } from 'primeng/api';
import { MonoTypeOperatorFunction, tap } from 'rxjs';

/**
 * Operatore RxJS personalizzato per mostrare notifiche di successo tramite PrimeNG MessageService.
 *
 * @param messageService L'istanza di MessageService iniettata nel componente/servizio.
 * @param detail Il messaggio di dettaglio da mostrare nel toast.
 * @param summary (Opzionale) Il titolo del toast. Default: 'Successo'.
 */
export function notifySuccess<T>(
  messageService: MessageService,
  detail: string,
  summary: string = 'Successo'
): MonoTypeOperatorFunction<T> {
  return tap<T>(() => {
    messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
    });
  });
}
