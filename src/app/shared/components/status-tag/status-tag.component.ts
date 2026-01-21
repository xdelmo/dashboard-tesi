import { Component, input, computed } from '@angular/core';

import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-tag',
  template: `
    <p-tag
      [value]="value()"
      [severity]="severity()"
      [rounded]="true"
      class="px-3"
    ></p-tag>
  `,
  standalone: true,
  imports: [TagModule, CommonModule],
})
export class StatusTagComponent {
  value = input.required<string>();

  severity = computed(() => {
    switch (this.value()) {
      case 'Attivo':
      case 'Pagato':
        return 'success';
      case 'In Attesa':
      case 'Bozza':
      case 'Sospeso':
        return 'warn';
      case 'Inattivo':
      case 'Fallito':
      case 'Archiviato':
      case 'Disattivato':
      case 'Scaduto':
        return 'danger';
      case 'Admin Only':
        return 'contrast';
      default:
        return 'info';
    }
  });
}
