import { Cloud, CloudFog, CloudRain, CloudSunRain, Droplets, Gauge, Sun, Wind } from 'lucide-react'

interface WeatherDisplayProps {
  temperature: number
  location: string
  condition: string
  date: string
  pressure: number
  windSpeed: number
  humidity: number
  hourlyTemperatures: number[],
}
export function WeatherDisplay({
  temperature,
  location,
  condition,
  date,
  pressure,
  windSpeed,
  humidity,
  hourlyTemperatures,
}: Readonly<WeatherDisplayProps>) {
  const weatherIcon = () => {
    if (humidity <= 40) return <Sun className="h-6 text-yellow-600 w-6" />
    if (humidity >= 90) return <CloudFog className="h-6 text-teal-600 w-6" />
    if (humidity >= 70) return <CloudRain className="h-6 text-blue-700 w-6" />
    if (humidity >= 50) return <CloudSunRain className="h-6 text-red-600 w-6" />
    if (humidity >= 40) return <Cloud className="h-6 text-cyan-500 w-6" />
  }
  const firstSixTemperatures = hourlyTemperatures.slice(0, 6);
  return (
    <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 text-white">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <div className="text-6xl sm:text-8xl text-teal-600 font-light">{temperature}°C</div>
          <h1 className="text-2xl sm:text-4xl text-amber-600 font-semibold mt-2">{location}</h1>
          <p className="text-base sm:text-lg mt-1">{date}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xl">
            {weatherIcon()}<span>{condition}</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 text-blue-500 w-4" />
            <span>Humidity</span>
            <span className="font-semibold text-green-500">{humidity}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
          <Gauge className="h-5 text-red-600 w-5" />
          <span>Pressure</span>
          <span className="font-semibold text-lime-500 ml-auto">{pressure} mb</span>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
          <Wind className="h-5 text-blue-600 w-5" />
          <span>Wind</span>
          <span className="font-semibold text-cyan-500 ml-auto">{windSpeed} mph</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-6">
        <div className="flex flex-wrap items-center gap-2 bg-white/5 rounded-lg p-3">
          {weatherIcon()}
          <span className="text-white/70">Hourly Temperatures</span>
          <div className="w-full mt-2 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {firstSixTemperatures.map((temp, index) => (
              <div key={`temp-${temp}-${index}`} className="flex items-center justify-center bg-white/5 rounded p-2">
                <span className="text-green-500">{temp}</span>
                <span className="text-pink-700 text-sm ml-1">°C</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
