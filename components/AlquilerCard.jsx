"use client";

import Link from "next/link";
import { useState } from "react";

export default function AlquilerCard({ alquiler }) {
    const [imgError, setImgError] = useState(false);

    // Manejo seguro de las imágenes
    let imagenPrincipal = "/logo-montana.png";
    if (alquiler.fotos) {
        try {
            const fotosArray =
                typeof alquiler.fotos === "string"
                    ? JSON.parse(alquiler.fotos)
                    : alquiler.fotos;
            if (Array.isArray(fotosArray) && fotosArray.length > 0) {
                imagenPrincipal = `/${fotosArray[0]}`;
            }
        } catch (e) {
            console.error("Error parseando fotos:", e);
        }
    }

    return (
        <Link
            href={`/alquileres/${alquiler.id}`}
            className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
        >
            {/* Imagen del Card */}
            <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                    src={imgError ? "/logo-montana.png" : imagenPrincipal}
                    alt={alquiler.nombre}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 will-change-transform"
                    onError={() => setImgError(true)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 shadow-sm">
                    ID: {alquiler.id}
                </div>
            </div>

            {/* Contenido del Card */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {alquiler.nombre}
                </h3>

                <div className="flex items-center space-x-2 text-gray-500 mb-4 text-sm">
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                    </svg>
                    <span>
                        Capacidad:{" "}
                        <span className="font-semibold text-gray-700">
                            {alquiler.capacidad_maxima} personas
                        </span>
                    </span>
                </div>

                {/* Separador */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold">
                            Precio por noche
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                            ${alquiler.precio}
                        </p>
                    </div>
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-md group-hover:shadow-lg">
                        Ver Detalles
                    </span>
                </div>
            </div>
        </Link>
    );
}
