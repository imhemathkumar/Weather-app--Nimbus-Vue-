'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// Explicitly import the icon to ensure it works with TypeScript
import { Icon } from 'leaflet';

// Fix for default marker icon
if (L.Icon) {
  // We cast to the Icon constructor directly
  const iconPrototype = L.Icon.Default.prototype as L.IconOptions;

  if (iconPrototype._getIconUrl) {
    delete iconPrototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
    });
  }
}

interface LeafletMapProps {
  center: [number, number];
  onLocationSelect: (lat: number, lon: number) => void;
  weatherInfo?: {
    temperature: number;
    condition: string;
  };
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, onLocationSelect]);

  return null;
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
}

export default function LeafletMap({ center, onLocationSelect, weatherInfo }: LeafletMapProps) {
  return (
    <MapContainer 
      center={center}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openweathermap.org/copyright">OpenStreetMap</a> contributors'
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
  );
}
