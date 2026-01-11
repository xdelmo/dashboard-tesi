import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { FooterComponent } from '../../components/footer/footer.component';
import { MarqueeComponent } from '../../components/marquee/marquee.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { WordLoopComponent } from '../../components/word-loop/word-loop.component';
import { FeedbackComponent } from '../../components/feedback/feedback.component';
import { CtaComponent } from '../../components/cta/cta.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Button,
    Tag,
    FooterComponent,
    MarqueeComponent,
    FeaturesComponent,
    WordLoopComponent,
    FeedbackComponent,
    CtaComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingPageComponent {}
