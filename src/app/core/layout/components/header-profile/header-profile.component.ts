import { Component, OnInit, Signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
  standalone: false,
})
export class HeaderProfileComponent implements OnInit {
  currentUser: Signal<User | null>;
  userMenuItems: MenuItem[] = [];

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
    this.userMenuItems = [
      {
        label: 'Sign Out',
        icon: 'pi pi-power-off',
        iconClass: 'text-red-500',
        labelClass: 'text-red-500',
        command: () => {
          this.logout();
        },
      },
    ];
  }

  logout() {
    this.authService.logout();
  }
}
