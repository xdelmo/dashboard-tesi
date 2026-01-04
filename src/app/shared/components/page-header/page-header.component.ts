import { Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: false,
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  title = input<string>('');
  subtitle = input<string>('');
}
