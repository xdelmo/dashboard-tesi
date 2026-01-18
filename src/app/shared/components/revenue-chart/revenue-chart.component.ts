import { Component, input, effect } from '@angular/core';
import { Order, OrderStatus } from '../../../core/models/order.model';

import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss'],
  standalone: true,
  imports: [ChartModule, CommonModule],
})
export class RevenueChartComponent {
  orders = input<Order[]>([]);
  year = input<number>(new Date().getFullYear());

  data: any;
  options: any;

  constructor() {
    effect(() => {
      this.updateChart(this.orders(), this.year());
    });
  }

  private updateChart(orders: Order[], year: number) {
    const monthlyRevenue = new Array(12).fill(0);

    orders.forEach((order) => {
      const orderDate = new Date(order.date);
      if (
        orderDate.getFullYear() === year &&
        order.status === OrderStatus.Paid
      ) {
        monthlyRevenue[orderDate.getMonth()] += order.total;
      }
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary',
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        'Gen',
        'Feb',
        'Mar',
        'Apr',
        'Mag',
        'Giu',
        'Lug',
        'Ago',
        'Set',
        'Ott',
        'Nov',
        'Dic',
      ],
      datasets: [
        {
          label: `Fatturato ${year}`,
          data: monthlyRevenue,
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
