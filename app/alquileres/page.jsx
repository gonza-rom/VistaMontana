import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export default async function Alquileres() {
  const db = supabase();

  const { data: alquileres, error } = await db
    .from("alojamientos")
    .select("*")
    .eq("activo", true)
    .order("tipo", { ascending: false }); // Casa completa primero

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error cargando datos: </strong>
          <span className="block sm:inline">{error.message}</span>
        </div>
      </div>
    );
  }

  // Organizar alojamientos: casa completa y habitaciones
  const casaCompleta = alquileres?.find(a => a.tipo === 'casa');
  const habitaciones = alquileres?.filter(a => a.tipo === 'habitacion') || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-sierra">
            Opciones de Alojamiento
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Elegí entre nuestras habitaciones individuales o alquilá la casa completa
            para tu grupo. Todas las opciones incluyen acceso a las áreas comunes
            y vistas espectaculares.
          </p>
        </div>

        {/* Casa Completa */}
        {casaCompleta && (
          <section className="mb-20">
            <h2 className="text-4xl font-bold mb-8 text-center">Casa Completa</h2>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Imágenes */}
                <div className="relative h-96 lg:h-auto">
                  <Image
                    src="/patio-6.avif"
                    alt="Casa Completa Vista Montaña"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>

                {/* Información */}
                <div className="p-8 lg:p-12">
                  <div className="mb-6">
                    <span className="px-5 py-2 rounded-full font-semibold shadow-md bg-gradient-to-r from-purple-500 to-purple-600 text-white inline-block mb-4">
                      🏠 Casa Completa
                    </span>
                    <h3 className="text-3xl font-bold mb-4">{casaCompleta.nombre}</h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {casaCompleta.descripcion}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-700">
                      <span className="text-2xl mr-3">👥</span>
                      <span className="font-medium">Capacidad: Hasta {casaCompleta.capacidad} personas</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-2xl mr-3">🛏️</span>
                      <span className="font-medium">3 Habitaciones completas</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-2xl mr-3">🍳</span>
                      <span className="font-medium">Cocina equipada completa</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-2xl mr-3">🔥</span>
                      <span className="font-medium">Quincho con parrilla</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="text-2xl mr-3">📡</span>
                      <span className="font-medium">WiFi Starlink de alta velocidad</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mb-8 border-2 border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Precio por noche</p>
                    <div className="text-4xl font-bold text-gradient-sierra">
                      ${parseFloat(casaCompleta.precio_por_noche).toLocaleString()}
                    </div>
                  </div>

                  <Link
                    href={`/alquileres/${casaCompleta.id}`}
                    className="block w-full text-center px-8 py-4 gradient-sierra text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover-glow"
                  >
                    Ver Detalles Completos
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Habitaciones */}
        {habitaciones.length > 0 && (
          <section>
            <h2 className="text-4xl font-bold mb-8 text-center">Habitaciones Individuales</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Todas las habitaciones incluyen acceso a cocina, living, quincho, baños y WiFi Starlink
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {habitaciones.map((habitacion) => {
                // Parsear fotos
                let imagenPrincipal = '/logo-montana.png';
                if (habitacion.fotos) {
                  try {
                    const fotosArray = typeof habitacion.fotos === 'string'
                      ? JSON.parse(habitacion.fotos)
                      : habitacion.fotos;
                    
                    if (Array.isArray(fotosArray) && fotosArray.length > 0) {
                      // Extraer solo el nombre del archivo
                      const fileName = fotosArray[0].split('/').pop();
                      imagenPrincipal = `/${fileName}`;
                    }
                  } catch (e) {
                    console.error('Error parseando fotos:', e);
                  }
                }

                return (
                  <div
                    key={habitacion.id}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover-lift"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={imagenPrincipal}
                        alt={habitacion.nombre}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm bg-blue-500 bg-opacity-90 text-white">
                          🛏️ Habitación
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">
                        {habitacion.nombre}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {habitacion.descripcion || 'Habitación cómoda con acceso a todas las áreas comunes'}
                      </p>

                      {/* Info Row */}
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                        <div className="flex items-center text-gray-600">
                          <span className="text-2xl mr-2">👥</span>
                          <span className="font-medium">Hasta {habitacion.capacidad} personas</span>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-3xl font-bold text-gradient-sierra">
                            ${parseFloat(habitacion.precio_por_noche).toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-500">por persona la noche</div>
                        </div>
                        <Link
                          href={`/alquileres/${habitacion.id}`}
                          className="px-6 py-3 gradient-sierra text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-glow"
                        >
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!alquileres || alquileres.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🏔️</div>
            <p className="text-2xl text-gray-500 font-medium">
              No hay alojamientos disponibles por el momento
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}