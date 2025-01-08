'use client'

import dynamic from 'next/dynamic'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet' // Use the correct imports for React-Leaflet

// Dynamically import your custom map component (make sure it's the correct one)
const LeafletMap = dynamic(() => import('./leaflet-map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
})

interface WeatherMapProps {
  onLocationSelect: (lat: number, lon: number) => void
  center: [number, number]
  weatherInfo?: {
    temperature: number
    condition: string
  }
}

export function WeatherMap({ onLocationSelect, center, weatherInfo }: Readonly<WeatherMapProps>) {
  if (typeof window === 'undefined') {
    return null // Return null on the server side
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      {/* Use the LeafletMap component */}
      <LeafletMap
        center={center}
        onLocationSelect={onLocationSelect}
        weatherInfo={weatherInfo}
      />
    </div>
  )
}
