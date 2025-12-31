"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Map({ lugares }) {
  return (
    <MapContainer
      center={[-27.8659, -65.7251]}
      zoom={12}
      scrollWheelZoom
      className="h-[500px] w-full rounded-lg border"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {lugares?.map((l) => (
        <Marker key={l.id} position={[l.latitud, l.longitud]}>
          <Popup>
            <strong>{l.nombre}</strong>
            <br />
            {l.descripcion}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
