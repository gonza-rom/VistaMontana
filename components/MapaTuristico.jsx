"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import L from 'leaflet';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapaTuristico({ lugares }) {
  const centro = [-27.864023893909792, -65.72607652939269];

  return (
    <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '500px' }}>
      <MapContainer 
        center={centro} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Marker del hospedaje */}
        <Marker position={centro}>
          <Popup>
            <div className="text-center">
              <strong className="text-lg">🏠 Hospedaje Vista Montaña</strong>
              <p className="text-sm">Tu punto de partida</p>
            </div>
          </Popup>
        </Marker>

        {/* Markers de lugares turísticos */}
        {lugares.map(lugar => (
          <Marker 
            key={lugar.id}
            position={[parseFloat(lugar.latitud), parseFloat(lugar.longitud)]}
          >
            <Popup>
              <div className="max-w-xs">
                <h3 className="font-bold text-lg mb-2">{lugar.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {lugar.descripcion.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    📍 {lugar.distancia_km} km
                  </span>
                  <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                    {lugar.dificultad}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}