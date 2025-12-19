import { Component, signal } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { APP_CONSTANTS } from '../../../constants/app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  email = APP_CONSTANTS.AUTH.DEMO_EMAIL;
  password = APP_CONSTANTS.AUTH.DEMO_PASSWORD;
  error = signal('');
  isLoading = signal(false);

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    // 1. Resetta stato
    this.error.set('');
    this.isLoading.set(true);

    // 2. Chiama il servizio (che ora ritorna un Observable)
    this.authService.login(this.email, this.password).subscribe({
      next: (isSuccess) => {
        // Questa funzione viene eseguita DOPO il delay di 1 secondo
        this.isLoading.set(false); // Spegni lo spinner

        if (isSuccess) {
          // Login OK -> Vai alla dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Login Fallito -> Mostra errore
          this.error.set('Credenziali non valide. Riprova.');
        }
      },
      error: (err) => {
        // Gestione errori imprevisti (es. server down)
        this.isLoading.set(false);
        this.error.set('Errore di connessione. Riprova più tardi.');
        console.error(err);
      },
    });
  }
}
