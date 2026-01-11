import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss',
})
export class MarqueeComponent {
  items = input<string[]>([]); // Used if we want to pass images dynamically
  direction = input<'left' | 'right'>('left');

  partners = [
    { name: 'Acme Corp', icon: 'pi pi-apple' },
    { name: 'Globex', icon: 'pi pi-google' },
    { name: 'Soylent Corp', icon: 'pi pi-amazon' },
    { name: 'Initech', icon: 'pi pi-microsoft' },
    { name: 'Umbrella Corp', icon: 'pi pi-discord' },
    { name: 'Stark Ind', icon: 'pi pi-facebook' },
    { name: 'Wayne Ent', icon: 'pi pi-twitter' },
    { name: 'Cyberdyne', icon: 'pi pi-github' },
  ];
}
