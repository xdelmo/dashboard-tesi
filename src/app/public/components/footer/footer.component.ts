import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, Button],
  templateUrl: './footer.component.html',
  styles: [],
})
export class FooterComponent {}
