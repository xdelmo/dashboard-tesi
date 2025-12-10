import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  email = 'admin@demo.com'; // Precompilato per comodità
  password = 'password';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    // 1. Resetta stato
    this.error = '';
    this.isLoading = true;

    // 2. Chiama il servizio (che ora ritorna un Observable)
    this.authService.login(this.email, this.password).subscribe({
      next: (isSuccess) => {
        // Questa funzione viene eseguita DOPO il delay di 1 secondo
        this.isLoading = false; // Spegni lo spinner

        if (isSuccess) {
          // Login OK -> Vai alla dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Login Fallito -> Mostra errore
          this.error = 'Credenziali non valide. Riprova.';
        }
      },
      error: (err) => {
        // Gestione errori imprevisti (es. server down)
        this.isLoading = false;
        this.error = 'Errore di connessione. Riprova più tardi.';
        console.error(err);
      },
    });
  }
}
