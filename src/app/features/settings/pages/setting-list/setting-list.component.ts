import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { API_CONFIG } from '../../../../core/config/api.config';

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './setting-list.component.html',
  styleUrl: './setting-list.component.scss',
})
export class SettingListComponent {
  private http = inject(HttpClient);

  downloadBackup() {
    forkJoin({
      customers: this.http.get(`${API_CONFIG.baseUrl}/customers`),
      orders: this.http.get(`${API_CONFIG.baseUrl}/orders`),
      users: this.http.get(`${API_CONFIG.baseUrl}/users`),
    }).subscribe((data) => {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `db_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
