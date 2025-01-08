import { Cloud, CloudFog, CloudRain, CloudSunRain, Droplets, Sun } from 'lucide-react'

interface WeatherCardProps {
  date: string
  humidity: number
  isToday?: boolean
  isTomorrow?: boolean
  isDayAfter?: boolean
  temperature: number
}

export function WeatherCard({ date, humidity, temperature, isToday = false, isTomorrow = false, isDayAfter = false }: Readonly<WeatherCardProps>) {
  const weatherIcon = () => {
    if (humidity <= 40) return <Sun className="h-6 text-yellow-600 w-6" />
    if (humidity >= 90) return <CloudFog className="h-6 text-teal-600 w-6" />
    if (humidity >= 70) return <CloudRain className="h-6 text-blue-700 w-6" />
    if (humidity >= 50) return <CloudSunRain className="h-6 text-red-600 w-6" />
    if (humidity >= 40) return <Cloud className="h-6 text-cyan-500 w-6" />
  }

  const getDateText = () => {
    if (isToday) return 'Today'
    if (isTomorrow) return 'Tomorrow'
    if (isDayAfter) return 'Day after'
    return date
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 text-white flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-orange-500">{getDateText()}</h3>
      <div className="flex items-center gap-2">
        {weatherIcon()}
        <span className="text-white/70">Temperature</span>
        <span className="font-semibold text-green-500 ml-auto">{temperature}°C</span>
      </div>
      <div className="flex items-center gap-2">
        <Droplets className="h-4 text-blue-500 w-4" />
        <span className="text-white/70">Humidity</span>
        <span className="font-semibold text-green-500 ml-auto">{humidity}%</span>
      </div>
    </div>
  )
}

