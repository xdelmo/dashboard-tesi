import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-status-tag',
  template: `
    <p-tag
      [value]="value()"
      [severity]="severity()"
      [rounded]="true"
      styleClass="px-3"
    ></p-tag>
  `,
  standalone: false,
})
export class StatusTagComponent {
  value = input.required<string>();

  severity = computed(() => {
    switch (this.value()) {
      case 'Active':
      case 'Pagato':
        return 'success';
      case 'In Attesa':
      case 'Draft':
        return 'warn';
      case 'Inattivo':
      case 'Fallito':
      case 'Archived':
        return 'danger';
      default:
        return 'info';
    }
  });
}
