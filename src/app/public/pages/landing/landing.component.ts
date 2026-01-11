import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from '../../components/footer/footer.component';
import { MarqueeComponent } from '../../components/marquee/marquee.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { WordLoopComponent } from '../../components/word-loop/word-loop.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    FooterComponent,
    MarqueeComponent,
    FeaturesComponent,
    WordLoopComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingPageComponent {}
