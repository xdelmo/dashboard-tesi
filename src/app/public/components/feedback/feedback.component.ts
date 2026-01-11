import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

interface Feedback {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, CarouselModule, TagModule, RatingModule, FormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {
  feedbacks = signal<Feedback[]>([
    {
      id: 1,
      name: 'Giulia Rossi',
      role: 'CEO',
      company: 'Tech Solutions S.r.l.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      quote:
        'ApexFlow ha rivoluzionato il modo in cui gestiamo i nostri clienti. La dashboard è intuitiva e le analytics ci hanno permesso di individuare nuove opportunità di crescita in pochissimo tempo.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Marco Bianchi',
      role: 'Head of Sales',
      company: 'Innovatech',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      quote:
        'Finalmente un CRM che fa quello che promette. L’automazione dei processi di vendita ci ha fatto risparmiare ore di lavoro manuale ogni settimana. Consigliatissimo!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Elena Verdi',
      role: 'Operations Manager',
      company: 'Logistica Rapida',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      quote:
        'La gestione degli ordini è diventata un gioco da ragazzi. La possibilità di tracciare tutto in tempo reale ci ha dato un controllo completo sul nostro flusso di lavoro.',
      rating: 4,
    },
    {
      id: 4,
      name: 'Alessandro Neri',
      role: 'CTO',
      company: 'SoftDev',
      image: 'https://randomuser.me/api/portraits/men/85.jpg',
      quote:
        'Impressionante la facilità di integrazione e la pulizia del codice. Un prodotto solido e ben progettato, perfetto per scalare il nostro business.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Sofia Gialli',
      role: 'Marketing Director',
      company: 'Creative Agency',
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
      quote:
        'Le funzionalità di reporting sono eccellenti. Possiamo creare report personalizzati per i nostri clienti in pochi click, con una veste grafica professionale.',
      rating: 5,
    },
  ]);

  responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
