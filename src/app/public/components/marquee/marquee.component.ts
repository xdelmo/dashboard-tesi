import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.component.html',
  styleUrl: './marquee.component.scss',
})
export class MarqueeComponent {
  @Input() items: string[] = []; // Used if we want to pass images dynamically
  @Input() direction: 'left' | 'right' = 'left';

  // Placeholder icons (using PrimeIcons or similar text if images are not available)
  // For this implementation, I'll use a text-based marquee or SVGs inline if images are not provided.
  // Given the user just wants a marquee, I'll create a generic list of "Partners" using text/icons for now
  // to avoid broken image links, unless I have logos.
  // Let's use simple text/icons for stability first.

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
