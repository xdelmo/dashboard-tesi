import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-subscription-expiry',
  standalone: true,
  imports: [CommonModule, TagModule],
  template: `
    @if (isExpiringSoon) {
      <p-tag
        severity="warn"
        value="In Scadenza"
        icon="pi pi-exclamation-triangle"
        pTooltip="Abbonamento in scadenza fra meno di 30 giorni"
        [rounded]="true"
      ></p-tag>
    }
  `,
})
export class SubscriptionExpiryComponent {
  @Input() date?: string;

  get isExpiringSoon(): boolean {
    if (!this.date) return false;

    const expiryDate = new Date(this.date);
    const now = new Date();

    // Check se data invalida
    if (isNaN(expiryDate.getTime())) return false;

    const diff = expiryDate.getTime() - now.getTime();

    const diffDays = diff / (1000 * 3600 * 24);

    return diffDays > 0 && diffDays < 30;
  }
}
