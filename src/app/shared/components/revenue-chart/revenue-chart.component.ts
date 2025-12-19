import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DataService } from '../../../core/services/data.services';
import { RevenueStats } from '../../../core/models/chart.model';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss'],
  standalone: false,
})
export class RevenueChartComponent implements OnInit {
  // Dati del grafico (Line Chart)
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getRevenueStats().subscribe((stats: RevenueStats) => {
      this.updateChartData(stats);
    });
  }

  private updateChartData(stats: RevenueStats): void {
    this.lineChartData = {
      labels: stats.labels,
      datasets: [
        {
          data: stats.data,
          label: 'Fatturato 2025',
          fill: true,
          tension: 0.4, // Curvatura morbida (Spline)
          borderColor: '#3f51b5',
          backgroundColor: 'rgba(63, 81, 181, 0.2)',
          pointBackgroundColor: '#fff',
          pointBorderColor: '#3f51b5',
          pointHoverBackgroundColor: '#3f51b5',
          pointHoverBorderColor: '#fff',
        },
      ],
    };
  }

  // Opzioni di stile (Nascondiamo la griglia brutta)
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
    },
    scales: {
      x: { grid: { display: false } }, // Nasconde griglia verticale
      y: { grid: { color: '#f0f0f0' }, beginAtZero: true },
    },
  };

  public lineChartLegend = true;
}
