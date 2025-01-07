'use client'

import dynamic from 'next/dynamic'
import type { Map as LeafletMap } from 'leaflet'

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
      <LeafletMap
        center={center}
        onLocationSelect={onLocationSelect}
        weatherInfo={weatherInfo}
      />
    </div>
  )
}

