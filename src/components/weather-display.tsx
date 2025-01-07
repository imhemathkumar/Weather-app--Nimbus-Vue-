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
      <div className="flex items-start justify-between">
        <div>
          <div className="text-8xl text-teal-600 font-light">{temperature}°C</div>
          <h1 className="text-4xl text-amber-600 font-semibold mt-2">{location}</h1>
          <p className="text-lg mt-1">{date}</p>
        </div>
        <div className="flex items-center gap-2 text-xl">
        {weatherIcon()}<span>{condition}</span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="h-4 text-blue-500 w-4" />
            <span>Humidity</span>
            <span className="font-semibold text-green-500">{humidity}%</span>
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
      <div className="flex items-center gap-2 bg-white/5 rounded-lg p-3">
        {weatherIcon()}
          <span>Hourly Temperatures</span>
          <span className="font-semibold ml-auto">
                      {firstSixTemperatures.map((temp, index) => (
                        <span key={`temp-${temp}-${index}`}>{temp} <span className='pr-1 text-pink-700 text-sm'>°C <span className='text-xl text-gray-400 pr-1'>|</span></span>  </span>
                      ))}
          </span>
        </div>
        </div>
    </div>
  )
}