import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss'],
  standalone: false,
})
export class RevenueChartComponent {
  // Dati del grafico (Line Chart)
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 90],
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
