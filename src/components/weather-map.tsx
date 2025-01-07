'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

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

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    const handleClick = (e: any) => {
      const { lat, lng } = e.latlng
      onLocationSelect(lat, lng)
    }

    map.on('click', handleClick)

    return () => {
      map.off('click', handleClick)
    }
  }, [map, onLocationSelect])

  return null
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap()
  map.setView(center, map.getZoom())
  return null
}

export function WeatherMap({ onLocationSelect, center, weatherInfo }: Readonly<WeatherMapProps>) {
  const [mapError, setMapError] = useState<string | null>(null)

  if (typeof window === 'undefined') {
    return null // Return null on the server side
  }

  return (
    <div className="h-[400px] w-full rounded-lg overflow-hidden">
      {mapError ? (
        <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-600">
          {mapError}
        </div>
      ) : (
        <LeafletMap
          center={center}
          onLocationSelect={onLocationSelect}
          weatherInfo={weatherInfo}
        />
      )}
    </div>
  )
}

