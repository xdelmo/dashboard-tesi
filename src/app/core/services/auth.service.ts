import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Signal per lo stato di login
  isLoggedIn = signal<boolean>(this.hasToken());

  constructor(private router: Router) {}

  // Simula il Login
  login(email: string, password: string): Observable<boolean> {
    if (
      email === APP_CONSTANTS.AUTH.DEMO_EMAIL &&
      password === APP_CONSTANTS.AUTH.DEMO_PASSWORD
    ) {
      // Qui simuli una chiamata API reale
      return of(true).pipe(
        delay(1000), // Finto ritardo di rete
        tap(() => {
          localStorage.setItem(
            APP_CONSTANTS.AUTH.TOKEN_KEY,
            APP_CONSTANTS.AUTH.MOCK_TOKEN_VALUE
          ); // Salviamo un finto token
          this.isLoggedIn.set(true);
        })
      );
    } else {
      return of(false).pipe(
        delay(1000), // Finto ritardo di rete
        tap(() => {
          this.isLoggedIn.set(false);
        })
      );
    }
  }

  // Logout
  logout(): void {
    localStorage.removeItem(APP_CONSTANTS.AUTH.TOKEN_KEY);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  // Verifica se c'è il token salvato
  private hasToken(): boolean {
    return !!localStorage.getItem(APP_CONSTANTS.AUTH.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}
