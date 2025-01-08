'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  center: [number, number];
  onLocationSelect: (lat: number, lon: number) => void;
  weatherInfo?: {
    temperature: number;
    condition: string;
  };
}

const customIcon = {
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
};

//function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lon: number) => void }) {
//  useMapEvents({
//    click(e) {
//      onLocationSelect(e.latlng.lat, e.latlng.lng);
//    },
//  });
//  return null;
//}

//function ChangeView({ center }: { center: [number, number] }) {
//  const map = useMap();
//  useEffect(() => {
//    map.setView(center, map.getZoom());
//  }, [center, map]);
//  return null;
//}

export default function LeafletMap({ center, onLocationSelect, weatherInfo }: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(center, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);

      mapRef.current.on('click', (e: L.LeafletMouseEvent) => {
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      });
    } else {
      mapRef.current.setView(center);
    }

    // Update or create marker
    if (markerRef.current) {
      markerRef.current.setLatLng(center);
    } else {
      markerRef.current = L.marker(center, { icon: L.icon(customIcon) }).addTo(mapRef.current);
    }

    // Update popup content
    if (weatherInfo) {
      markerRef.current.bindPopup(`
        <div class="text-center">
          <div class="text-lg font-bold">${weatherInfo.temperature}°C</div>
          <div class="text-sm">${weatherInfo.condition}</div>
        </div>
      `).openPopup();
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markerRef.current = null;
    };
  }, [center, onLocationSelect, weatherInfo]);

  return <div id="map" style={{ height: '100%', width: '100%' }}></div>;
}

