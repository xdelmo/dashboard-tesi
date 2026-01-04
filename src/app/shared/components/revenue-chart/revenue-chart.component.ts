import { Component, OnInit, inject } from '@angular/core';
import { DataService } from '../../../core/services/data.services';
import { RevenueStats } from '../../../core/models/chart.model';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss'],
  standalone: false,
})
export class RevenueChartComponent implements OnInit {
  private dataService = inject(DataService);

  data: any;
  options: any;

  ngOnInit() {
    this.dataService.getRevenueStats().subscribe((stats: RevenueStats) => {
      this.initChart(stats);
    });
  }

  private initChart(stats: RevenueStats) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: stats.labels,
      datasets: [
        {
          label: 'Fatturato 2025',
          data: stats.data,
          fill: true,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
          tension: 0.4,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
