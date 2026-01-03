import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../constants/app.constants';
import { API_CONFIG } from '../config/api.config';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Signal per lo stato di login
  isLoggedIn = signal<boolean>(this.hasToken());

  // Signal per l'utente corrente
  currentUser = signal<User | null>(this.getUserFromStorage());

  constructor(private router: Router, private http: HttpClient) {}

  // Login via API
  login(email: string, password: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${API_CONFIG.baseUrl}/users`).pipe(
      delay(1000),
      map((users) => {
        return users.find((u) => u.email === email && u.password === password);
      }),
      tap((user) => {
        if (user) {
          localStorage.setItem(APP_CONSTANTS.AUTH.TOKEN_KEY, APP_CONSTANTS.AUTH.MOCK_TOKEN_VALUE);
          localStorage.setItem(APP_CONSTANTS.AUTH.CURRENT_USER_KEY, JSON.stringify(user));
          this.isLoggedIn.set(true);
          this.currentUser.set(user);
        } else {
          this.isLoggedIn.set(false);
          this.currentUser.set(null);
        }
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem(APP_CONSTANTS.AUTH.TOKEN_KEY);
    localStorage.removeItem(APP_CONSTANTS.AUTH.CURRENT_USER_KEY);
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  // Verifica se c'è il token salvato
  private hasToken(): boolean {
    return !!localStorage.getItem(APP_CONSTANTS.AUTH.TOKEN_KEY);
  }

  // Recupera l'utente dallo storage
  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(APP_CONSTANTS.AUTH.CURRENT_USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user?.role === 'admin';
  }
}
