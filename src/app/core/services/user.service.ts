import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { User } from '../models/user.model';
import { MessageService } from 'primeng/api';
import { notifySuccess } from '../../shared/utils/notification.operator';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/users`);
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .patch<User>(`${API_CONFIG.baseUrl}/users/${user.id}`, user)
      .pipe(
        notifySuccess(this.messageService, 'Utente aggiornato con successo')
      );
  }
}
