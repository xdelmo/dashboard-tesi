import {
  Component,
  input,
  signal,
  effect,
  EffectCleanupRegisterFn,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-word-loop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './word-loop.component.html',
  styleUrl: './word-loop.component.scss',
  animations: [
    trigger('slideUp', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate(
          '0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1, position: 'absolute' }),
        animate(
          '0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          style({ transform: 'translateY(-100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class WordLoopComponent {
  words = input<string[]>(['Analytics', 'Automation', 'CRM', 'Security']);
  interval = input<number>(2500);

  currentIndex = signal(0);

  constructor() {
    effect((onCleanup: EffectCleanupRegisterFn) => {
      const timer = setInterval(() => {
        this.currentIndex.update(
          (index: number) => (index + 1) % this.words().length
        );
      }, this.interval());

      onCleanup(() => clearInterval(timer));
    });
  }
}
