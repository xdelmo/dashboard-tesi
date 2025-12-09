import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject tiene traccia dello stato corrente
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  // Simula il Login
  login(email: string, password: string): Observable<boolean> {
    // Qui simuli una chiamata API reale
    return of(true).pipe(
      delay(1000), // Finto ritardo di rete
      tap(() => {
        localStorage.setItem('auth_token', 'fake-jwt-token'); // Salviamo un finto token
        this.isLoggedInSubject.next(true);
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('auth_token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Verifica se c'è il token salvato
  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}
