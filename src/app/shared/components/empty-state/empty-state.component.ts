import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class EmptyStateComponent {
  @Input() title: string = 'Nessun dato presente';
  @Input() subtitle: string =
    'Non ci sono elementi da visualizzare al momento.';
  @Input() icon: string = 'pi pi-info-circle';
}
