import {
  Component,
  input,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-subscription-expiry',
  standalone: true,
  imports: [CommonModule, TagModule, TooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subscription-expiry.component.html',
})
export class SubscriptionExpiryComponent {
  date = input<string | undefined>();

  isExpiringSoon = computed(() => {
    const dateStr = this.date();
    if (!dateStr) return false;

    const expiryDate = new Date(dateStr);
    const now = new Date();

    // Check se data invalida
    if (isNaN(expiryDate.getTime())) return false;

    const diff = expiryDate.getTime() - now.getTime();
    const diffDays = diff / (1000 * 3600 * 24);

    return diffDays > 0 && diffDays < 30;
  });
}
