import { Component, input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  standalone: true,
  imports: [CardModule, CommonModule],
})
export class StatCardComponent {
  title = input<string>('');
  value = input<string>('');
  subValue = input<string>('');
  icon = input<string>('');
  colorClass = input<string>('blue'); // blue, purple, green, orange
}
