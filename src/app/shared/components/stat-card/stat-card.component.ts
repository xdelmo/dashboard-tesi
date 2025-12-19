import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  standalone: false,
})
export class StatCardComponent {
  title = input<string>('');
  value = input<string>('');
  subValue = input<string>('');
  icon = input<string>('');
  colorClass = input<string>('blue'); // blue, purple, green, orange
}
