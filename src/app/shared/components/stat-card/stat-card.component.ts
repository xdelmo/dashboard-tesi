import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  standalone: false,
})
export class StatCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() subValue: string = '';
  @Input() icon: string = '';
  @Input() colorClass: string = 'blue'; // blue, purple, green, orange
}
