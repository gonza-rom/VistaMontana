import { supabase } from "@/lib/supabase";
import MapaTuristico from "@/components/MapaTuristico";
import Image from "next/image";

export default async function Turismo() {
  const db = supabase();

  const { data: lugares, error } = await db
    .from("lugares_turisticos")
    .select("*")
    .eq("activo", true)
    .order("distancia_km");

  if (error) {
    console.error("Error cargando lugares:", error);
  }

  const getDificultadColor = (dificultad) => {
    switch(dificultad) {
      case 'facil': return 'bg-green-100 text-green-800';
      case 'moderado': return 'bg-yellow-100 text-yellow-800';
      case 'dificil': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDificultadText = (dificultad) => {
    switch(dificultad) {
      case 'facil': return 'Fácil';
      case 'moderado': return 'Moderado';
      case 'dificil': return 'Difícil';
      default: return dificultad;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-white py-16" style={{backgroundColor: '#2D5F3F'}}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Lugares para Visitar
          </h1>
          <p className="text-xl text-gray-100">
            Descubrí los tesoros naturales de Balcozna y sus alrededores
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mapa */}
        {lugares && lugares.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Mapa de Atractivos</h2>
            <MapaTuristico lugares={lugares} />
          </div>
        )}

        {/* Listado de lugares */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Atractivos Turísticos</h2>
          
          {lugares && lugares.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lugares.map(lugar => (
                <div 
                  key={lugar.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                >
                  <div className="relative h-56 bg-gray-200">
                    {lugar.imagen ? (
                      <Image 
                        src={`/${lugar.imagen}`}
                        alt={lugar.nombre}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-green-100 to-blue-100">
                        {lugar.tipo === 'cascada' && '🌊'}
                        {lugar.tipo === 'mirador' && '👁️'}
                        {lugar.tipo === 'sendero' && '🥾'}
                        {lugar.tipo === 'cumbre' && '⛰️'}
                        {lugar.tipo === 'rio' && '💧'}
                        {!['cascada', 'mirador', 'sendero', 'cumbre', 'rio'].includes(lugar.tipo) && '📍'}
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">{lugar.nombre}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize font-medium">
                        {lugar.tipo}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {lugar.descripcion}
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-700">
                        <span className="mr-2">📍</span>
                        <span><strong>Distancia:</strong> {lugar.distancia_km} km del hospedaje</span>
                      </div>
                      
                      {lugar.duracion_visita && (
                        <div className="flex items-center text-gray-700">
                          <span className="mr-2">⏱️</span>
                          <span><strong>Duración:</strong> {lugar.duracion_visita}</span>
                        </div>
                      )}

                      <div className="flex items-center">
                        <span className="mr-2">🎯</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDificultadColor(lugar.dificultad)}`}>
                          <strong>Dificultad:</strong> {getDificultadText(lugar.dificultad)}
                        </span>
                      </div>
                    </div>

                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${lugar.latitud},${lugar.longitud}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition text-center font-medium"
                    >
                      Cómo llegar 🗺️
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-12 bg-gray-50 rounded-lg">
              <div className="text-6xl mb-4">🏔️</div>
              <p className="text-xl">No hay lugares turísticos disponibles</p>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Consejos para tu visita</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold mb-3 text-gray-900 text-lg">🎒 Qué llevar</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
                <li>Calzado cómodo para caminar</li>
                <li>Protector solar y gorra</li>
                <li>Agua suficiente</li>
                <li>Cámara para las fotos</li>
                <li>Ropa abrigada para la montaña</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3 text-gray-900 text-lg">⚠️ Recomendaciones</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
                <li>Empezá temprano para aprovechar el día</li>
                <li>Respetá la naturaleza y no dejes basura</li>
                <li>Consultá el clima antes de salir</li>
                <li>Algunos senderos requieren guía</li>
                <li>Avisá a alguien tu itinerario</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}