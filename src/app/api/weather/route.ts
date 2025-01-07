import { NextResponse } from 'next/server'

const API_KEY ='e644329a397475a1733e72c3ab32586b'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    const q = searchParams.get('q')

    if (!API_KEY) {
      throw new Error('OPENWEATHERMAP_API_KEY is not set')
    }

    let url: string

    if (q) {
      // Geocoding request
      url = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${API_KEY}`
    } else if (lat && lon) {
      // Weather request
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    } else {
      return NextResponse.json({ error: 'Invalid request parameters' }, { status: 400 })
    }

    const response = await fetch(url)
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OpenWeatherMap API responded with status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()

    if (q && Array.isArray(data) && data.length > 0) {
      // If it's a geocoding request, fetch the weather data for the first result
      const { lat, lon } = data[0]
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      )
      
      if (!weatherResponse.ok) {
        const errorText = await weatherResponse.text()
        throw new Error(`OpenWeatherMap API responded with status: ${weatherResponse.status}, message: ${errorText}`)
      }

      const weatherData = await weatherResponse.json()
      return NextResponse.json(weatherData)
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in weather API route:', error)
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal server error' }, { status: 500 })
  }
}

