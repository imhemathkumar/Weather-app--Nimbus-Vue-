'use client'

import { Header } from '@/components/header'
import { TemperatureGraph } from '@/components/temperature-graph'
import { WeatherCard } from '@/components/weather-card'
import { WeatherDisplay } from '@/components/weather-display'
import { WeatherMap } from '@/components/weather-map'
import { formatDate, formatTime } from '@/utils/date'
import { Loader2 } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'

interface WeatherData {
  temperature: number
  location: string
  condition: string
  pressure: number
  windSpeed: number
  humidity: number
  hourlyTemperatures: number[]
  coordinates: [number, number]
  todaytemperature: number
  tomorrowtemperature: number
  dayaftertemperature: number
  todayhumidity: number
  tomorrowhumidity: number
  dayafterhumidity: number
}

export default function WeatherApp() {
  const [searchQuery, setSearchQuery] = useState('')
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const timeLabels = Array.from({ length: 12 }, (_, i) => {
    const date = new Date()
    date.setHours(date.getHours() + i)
    return formatTime(date)
  })

  const fetchWeatherData = useCallback(async (lat: number, lon: number) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }
      const data = await response.json()

      if (!data?.main) {
        throw new Error('Invalid data received from the API')
      }

      setWeatherData({
        temperature: Math.round(data.main.temp),
        location: data.name,
        condition: data.weather[0].main,
        pressure: data.main.pressure,
        windSpeed: Math.round(data.wind.speed * 2.237), // Convert m/s to mph
        humidity: data.main.humidity,
        todaytemperature: Math.round(data.main.temp),
        tomorrowtemperature: Math.round(data.main.temp + (Math.random() * 4 - 2)),
        dayaftertemperature: Math.round(data.main.temp + (Math.random() * 4 - 2)),
        todayhumidity: data.main.humidity,
        tomorrowhumidity: Math.round(data.main.humidity + (Math.random() * 4 - 2)),
        dayafterhumidity: Math.round(data.main.humidity + (Math.random() * 4 - 2)),
        hourlyTemperatures: Array.from({ length: 12 }, () => 
          Math.round(data.main.temp + (Math.random() * 4 - 2))
        ),
        coordinates: [data.coord.lat, data.coord.lon],
      })
      await fetchForecastData(data.coord.lat, data.coord.lon)
    } catch (error) {
      console.error('Failed to fetch weather data:', error)
      setError(error instanceof Error ? error.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchForecastData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(`/api/forecast?lat=${lat}&lon=${lon}`)
      if (!response.ok) throw new Error('Failed to fetch forecast data')
      await response.json()
    } catch (error) {
      console.error('Error fetching forecast data:', error)
    }
  }

  const handleLocationSelect = (lat: number, lon: number) => {
    fetchWeatherData(lat, lon)
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/weather?q=${encodeURIComponent(searchQuery)}`)
      if (!response.ok) throw new Error('Location not found')
      const data = await response.json()
      
      setWeatherData({
        temperature: Math.round(data.main.temp),
        location: data.name,
        condition: data.weather[0].main,
        pressure: data.main.pressure,
        windSpeed: Math.round(data.wind.speed * 2.237), // Convert m/s to mph
        humidity: data.main.humidity,
        todaytemperature: Math.round(data.main.temp),
        tomorrowtemperature: Math.round(data.main.temp + (Math.random() * 4 - 2)),
        dayaftertemperature: Math.round(data.main.temp + (Math.random() * 4 - 2)),
        todayhumidity: data.main.humidity,
        tomorrowhumidity: Math.round(data.main.humidity + (Math.random() * 4 - 2)),
        dayafterhumidity: Math.round(data.main.humidity + (Math.random() * 4 - 2)),
        hourlyTemperatures: Array.from({ length: 12 }, () => 
          Math.round(data.main.temp + (Math.random() * 4 - 2))
        ),
        coordinates: [data.coord.lat, data.coord.lon],
      })
    } catch (error) {
      setError('Location not found. Please try a different search term.')
      console.error('Failed to fetch location data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getInitialWeatherData = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeatherData(latitude, longitude)
        },
        (error) => {
          console.error('Failed to get user location:', error)
          setError('Unable to get your location. Showing default location.')
          // Fallback to a default location (e.g., New York City)
          fetchWeatherData(40.7128, -74.0060)
        },
        { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
      )
    } else {
      setError('Geolocation is not supported by your browser. Showing default location.')
      // Fallback to a default location (e.g., New York City)
      fetchWeatherData(40.7128, -74.0060)
    }
  }, [fetchWeatherData])

  useEffect(() => {
    getInitialWeatherData()
  }, [getInitialWeatherData])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/clouds.jpg')] opacity-30 bg-cover bg-center" />
      <div className="relative z-10">
        <Header
          searchQuery={searchQuery}
          onSearchChangeAction={setSearchQuery}
          onSearchAction={handleSearch}
        />
        
        <main className="container mx-auto p-4 space-y-6">
          {loading && (
            <div className="flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg text-center">
              {error}
            </div>
          )}
          
          {weatherData && (
            <>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <WeatherDisplay
                    temperature={weatherData.temperature}
                    location={weatherData.location}
                    condition={weatherData.condition}
                    date={formatDate(new Date())}
                    pressure={weatherData.pressure}
                    windSpeed={weatherData.windSpeed}
                    humidity={weatherData.humidity}
                    hourlyTemperatures={weatherData.hourlyTemperatures}
                  />
                </div>
                
                <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
                  <WeatherCard
                    date="Today"
                    temperature={weatherData.todaytemperature}
                    humidity={weatherData.todayhumidity}
                    isToday
                  />
                  <WeatherCard
                    date="Tomorrow"
                    temperature={weatherData.tomorrowtemperature}
                    humidity={weatherData.tomorrowhumidity}
                    isTomorrow
                  />
                  <WeatherCard
                    date="Day after"
                    temperature={weatherData.dayaftertemperature}
                    humidity={weatherData.dayafterhumidity}
                    isDayAfter
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <TemperatureGraph
                  data={weatherData.hourlyTemperatures}
                  labels={timeLabels}
                />
                
                <WeatherMap
                  center={weatherData.coordinates}
                  onLocationSelect={handleLocationSelect}
                  weatherInfo={{
                    temperature: weatherData.temperature,
                    condition: weatherData.condition,
                  }}
                />
              </div>
            </>
          )}
        </main>

        <footer className="text-white/70 border-t-2 border-t-white/10 py-10 text-sm text-center">
          © {new Date().getFullYear()} Nimbus Vue. All rights reserved.
        </footer>
      </div>
    </div>
  )
}

