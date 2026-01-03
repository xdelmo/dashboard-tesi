import { Component, Signal } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Controlla il percorso
import { User } from '../../models/user.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: false,
})
export class MainLayoutComponent {
  currentUser: Signal<User | null>;

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  logout() {
    this.authService.logout();
  }
}
