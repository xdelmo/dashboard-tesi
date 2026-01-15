"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import { Order } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueChartProps {
  orders: Order[];
  year?: number;
}

export default function RevenueChart({
  orders,
  year = new Date().getFullYear(),
}: RevenueChartProps) {
  const chartData = useMemo(() => {
    const monthlyRevenue = new Array(12).fill(0);

    orders.forEach((order) => {
      const orderDate = new Date(order.date);

      if (orderDate.getFullYear() === year && order.status === "Pagato") {
        monthlyRevenue[orderDate.getMonth()] += order.total;
      }
    });

    return {
      labels: [
        "Gen",
        "Feb",
        "Mar",
        "Apr",
        "Mag",
        "Giu",
        "Lug",
        "Ago",
        "Set",
        "Ott",
        "Nov",
        "Dic",
      ],
      datasets: [
        {
          label: `Fatturato ${year}`,
          data: monthlyRevenue,
          fill: true,
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.4,
        },
      ],
    };
  }, [orders, year]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#4b5563",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#e5e7eb", drawBorder: false },
      },
      y: {
        ticks: { color: "#9ca3af" },
        grid: { color: "#e5e7eb", drawBorder: false },
      },
    },
  };

  return (
    <div className="w-full h-[400px]">
      <Line options={options} data={chartData} />
    </div>
  );
}
