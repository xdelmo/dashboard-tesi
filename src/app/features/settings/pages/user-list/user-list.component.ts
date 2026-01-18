import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { LoadingStateComponent } from '../../../../shared/components/loading-state/loading-state.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';

import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/models/user.model';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    PageHeaderComponent,
    EmptyStateComponent,
    LoadingStateComponent,
    ButtonModule,
    TableModule,
    SelectModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  private userService = inject(UserService);

  users = toSignal(this.userService.getUsers());

  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Utente', value: 'user' },
  ];

  updateRole(user: User, newRole: string) {
    if (user.role === newRole) return;

    // Cast to specific role type
    const role = newRole as 'admin' | 'user';
    const updatedUser = { ...user, role: role };
    this.userService.updateUser(updatedUser).subscribe();
  }
}
