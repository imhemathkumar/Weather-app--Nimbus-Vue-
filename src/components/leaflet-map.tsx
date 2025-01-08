'use client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

// Fix for default marker icon
delete (L as any).Icon.Default.prototype._getIconUrl;
(L as any).Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
})

interface LeafletMapProps {
  center: [number, number]
  onLocationSelect: (lat: number, lon: number) => void
  weatherInfo?: {
    temperature: number
    condition: string
  }
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    const handleClick = (e: L.LeafletMouseEvent) => {
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

export default function LeafletMap({ center, onLocationSelect, weatherInfo }: Readonly<LeafletMapProps>) {
  return (
    <MapContainer 
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center}>
        {weatherInfo && (
          <Popup>
            <div className="text-center">
              <div className="text-lg font-bold">{weatherInfo.temperature}°C</div>
              <div className="text-sm">{weatherInfo.condition}</div>
            </div>
          </Popup>
        )}
      </Marker>
      <MapEvents onLocationSelect={onLocationSelect} />
      <ChangeView center={center} />
    </MapContainer>
  )
}

