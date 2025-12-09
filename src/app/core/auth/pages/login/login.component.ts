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
  isLoading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault(); // Evita il reload della pagina
    this.isLoading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.error = 'Credenziali non valide';
        this.isLoading = false;
      },
    });
  }
}
