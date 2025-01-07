import { NextResponse } from 'next/server'

const API_KEY ='e644329a397475a1733e72c3ab32586b'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (!API_KEY) {
      throw new Error('OPENWEATHERMAP_API_KEY is not set')
    }

    if (!lat || !lon) {
      return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 })
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenWeatherMap API responded with status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()

    // Process the forecast data to get daily forecasts
    const dailyForecasts = processForecastData(data)

    return NextResponse.json(dailyForecasts)
  } catch (error) {
    console.error('Error in forecast API route:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}

function processForecastData(data: any) {
  const dailyForecasts: any = {}

  data.list.forEach((forecast: any) => {
    const date = new Date(forecast.dt * 1000).toISOString().split('T')[0]
    
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date,
        temperature: forecast.main.temp,
        humidity: forecast.main.humidity,
        condition: forecast.weather[0].main,
        icon: forecast.weather[0].icon,
      }
    }
  })

  return Object.values(dailyForecasts)
}

