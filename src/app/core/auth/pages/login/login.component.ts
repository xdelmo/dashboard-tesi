import { Component, signal, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  error = signal('');
  isLoading = signal(false);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    email: [
      APP_CONSTANTS.AUTH.DEMO_EMAIL,
      [Validators.required, Validators.email],
    ],
    password: [
      APP_CONSTANTS.AUTH.DEMO_PASSWORD,
      [Validators.required, Validators.minLength(6)],
    ],
  });

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();

    // 1. Resetta stato
    this.error.set('');
    this.isLoading.set(true);

    // 2. Chiama il servizio
    this.authService.login(email!, password!).subscribe({
      next: (isSuccess) => {
        this.isLoading.set(false);

        if (isSuccess) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error.set('Credenziali non valide. Riprova.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.error.set('Errore di connessione. Riprova più tardi.');
        console.error(err);
      },
    });
  }

  fillCredentials(email: string, pass: string) {
    this.loginForm.patchValue({
      email: email,
      password: pass,
    });
  }
}
