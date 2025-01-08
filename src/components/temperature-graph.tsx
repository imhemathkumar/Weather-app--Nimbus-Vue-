'use client'

import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  TooltipItem,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
)

interface TemperatureGraphProps {
  data: number[]
  labels: string[]
}

export function TemperatureGraph({ data, labels }: Readonly<TemperatureGraphProps>) {
  const chartData: ChartData<'line'> = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Temperature',
        data: data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 8,
          font: {
            size: 12,
          },
          callback: (value: number) => `${value}°C`,
        },
        min: Math.min(...data) - 2,
        max: Math.max(...data) + 2,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          padding: 8,
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 25, 40, 0.9)',
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'normal' as const,
        },
        bodyFont: {
          size: 14,
        },
        titleColor: 'rgba(255, 255, 255, 0.8)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (items: TooltipItem<'line'>[]) => {
            if (!items.length) return ''
            return `Time: ${items[0].label}`
          },
          label: (item: TooltipItem<'line'>) => {
            return `Temperature: ${item.raw}°C`
          },
        },
      },
    },
  }

  return (
    <div className="w-full bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl text-yellow-600 font-semibold mb-4">Temperature (°C)</h2>
      <div className="h-[300px] sm:h-[350px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  )
}

