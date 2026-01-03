"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ fotos, nombre }) {
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0);

  if (!fotos || fotos.length === 0) {
    return null;
  }

  return (
    <div className="animate-slide-up stagger-1">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-4 group">
        <div className="relative h-96">
          <Image
            src={`/${fotos[imagenSeleccionada]}`}
            alt={`${nombre} - Foto principal`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {fotos.length > 1 && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {fotos.map((foto, index) => (
            <button
              key={index}
              onClick={() => setImagenSeleccionada(index)}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                imagenSeleccionada === index
                  ? 'ring-4 ring-green-500 shadow-lg'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <div className="relative h-20">
                <Image
                  src={`/${foto}`}
                  alt={`Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}