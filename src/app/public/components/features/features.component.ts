import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  features = signal([
    {
      title: 'Analytics Avanzata & Reporting',
      description:
        'Monitora le performance del tuo business con dashboard interattive. Visualizza fatturato, ordini e crescita clienti in tempo reale grazie a grafici dinamici e KPI aggiornati che ti permettono di prendere decisioni basate sui dati, non sulle sensazioni.',
      image: 'images/feature-analytics.png',
      cta: 'Esplora Dashboard',
    },
    {
      title: 'Gestione Completa del Ciclo Vendite',
      description:
        'Ottimizza il flusso di lavoro con un CRM integrato potente e flessibile. Gestisci anagrafiche clienti, elabora ordini complessi con calcolo automatico di imposte e sconti, e mantieni il controllo totale sui ruoli e permessi del tuo team.',
      image: 'images/feature-security.png',
      cta: 'Vedi Funzionalità',
    },
  ]);
}
