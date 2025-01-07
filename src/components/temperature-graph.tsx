'use client'

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
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
  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Temperature',
        data: data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  return (
    <div className="w-full h-[350px] bg-white/5 backdrop-blur-sm rounded-lg p-4">
      <h2 className="text-yellow-600  text-xl mb-4">Temperature (°C)</h2>
      <Line options={options} data={chartData} />
    </div>
  )
}

