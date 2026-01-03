import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";

export default async function AlquilerDetalle({ params }) {
  const { id } = await params;
  const db = supabase();

  const { data: alquiler, error } = await db
    .from("alojamientos")
    .select("*")
    .eq("id", id)
    .eq("activo", true)
    .single();

  if (error || !alquiler) {
    notFound();
  }

  // Determinar las fotos según el tipo
  let fotos = [];
  if (alquiler.tipo === 'casa') {
    fotos = [
      'quincho-2.jpg',
      'patio-5.webp',
      'patio-6.jpg',
      'habitacion-1.jpg',
      'habitacion-2.jpg',
      'habitacion-3.jpg'
    ];
  } else if (alquiler.fotos) {
    try {
      const fotosArray = typeof alquiler.fotos === 'string'
        ? JSON.parse(alquiler.fotos)
        : alquiler.fotos;
      
      if (Array.isArray(fotosArray)) {
        fotos = fotosArray.map(foto => {
          const fileName = foto.split('/').pop();
          return fileName;
        });
      }
    } catch (e) {
      console.error('Error parseando fotos:', e);
      fotos = ['habitacion-1.jpg'];
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/alquileres"
          className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 group"
        >
          <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Volver a alojamientos</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{alquiler.nombre}</h1>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`px-5 py-2 rounded-full font-semibold shadow-md ${
                  alquiler.tipo === 'casa'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                }`}>
                  {alquiler.tipo === 'casa' ? '🏠 Casa Completa' : '🛏️ Habitación'}
                </span>
                <span className="flex items-center text-gray-700 font-medium">
                  <span className="text-2xl mr-2">👥</span>
                  Hasta {alquiler.capacidad} personas
                </span>
              </div>
              <div className="inline-block bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl px-8 py-4 mb-8">
                <div className="text-4xl font-bold text-gradient-sierra">
                  ${parseFloat(alquiler.precio_por_noche).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 font-medium">por noche</div>
              </div>
            </div>

            {/* Galería de Imágenes */}
            {fotos.length > 0 && <ImageGallery fotos={fotos} nombre={alquiler.nombre} />}

            {/* Amenities Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up stagger-2">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-900">
                <span className="text-3xl mr-3">✨</span>
                Características y Comodidades
              </h2>

              {alquiler.tipo === 'casa' ? (
                <div className="space-y-6">
                  {/* Video */}
                  <div className="mb-6">
                    <div className="relative rounded-2xl shadow-2xl overflow-hidden aspect-square">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/y8SgfCrdxME"
                        title="Hospedaje Vista Montaña"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-gray-900">
                      <span className="text-2xl mr-2">🛏️</span>3 Habitaciones Acogedoras
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start"><span className="mr-2">•</span><span>5 camas individuales</span></li>
                      <li className="flex items-start"><span className="mr-2">•</span><span>2 camas dobles</span></li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-gray-900">
                      <span className="text-2xl mr-2">🍳</span>Cocina Totalmente Equipada
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start"><span className="mr-2">•</span><span>Horno, vasos, platos y cubiertos</span></li>
                      <li className="flex items-start"><span className="mr-2">•</span><span>Utensilios completos de cocina</span></li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-gray-900">
                      <span className="text-2xl mr-2">📺</span>Sala de Estar
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start"><span className="mr-2">•</span><span>Mesa, sillas y TV con DirecTV</span></li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-red-500 pl-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-gray-900">
                      <span className="text-2xl mr-2">🔥</span>Quincho Contiguo
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start"><span className="mr-2">•</span><span>Parrilla con mesada</span></li>
                      <li className="flex items-start"><span className="mr-2">•</span><span>Grifo y bacha para mayor comodidad</span></li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-cyan-500 pl-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-gray-900">
                      <span className="text-2xl mr-2">🚿</span>2 Baños Completos
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start"><span className="mr-2">•</span><span>Agua caliente con tanque</span></li>
                    </ul>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-gray-900">
                      <span className="text-2xl mr-2">🌟</span>Extras
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start"><span className="mr-2">•</span><span><strong>WiFi Starlink</strong> - Internet de alta velocidad</span></li>
                      <li className="flex items-start"><span className="mr-2">•</span><span>Galpón de chapa para disfrutar de la lluvia</span></li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-bold text-lg mb-3 flex items-center text-gray-900">
                      <span className="text-2xl mr-2">✨</span>Acceso a Áreas Comunes
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start"><span className="mr-2">•</span><span><strong>WiFi Starlink</strong> - Internet de alta velocidad</span></li>
                      <li className="flex items-start"><span className="mr-2">•</span><span>Cocina equipada completa</span></li>
                      <li className="flex items-start"><span className="mr-2">•</span><span>Sala de estar con TV DirecTV</span></li>
                      <li className="flex items-start"><span className="mr-2">•</span><span>Quincho con parrilla</span></li>
                      <li className="flex items-start"><span className="mr-2">•</span><span>Baños con agua caliente</span></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up stagger-2">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900">
                <span className="text-3xl mr-3">📝</span>
                Descripción
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {alquiler.descripcion || 'Alojamiento cómodo con todas las comodidades necesarias para una estadía placentera.'}
              </p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-slide-up stagger-2">
              <h3 className="text-2xl font-bold mb-6 text-gradient-sierra">
                Información de Contacto
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Para consultar disponibilidad y realizar tu reserva, contactanos por WhatsApp o email.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href="https://wa.me/5493834946767"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-glow"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Contactar por WhatsApp
                </a>

                <Link
                  href="/contacto"
                  className="flex items-center justify-center gap-3 w-full py-4 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-glow"
                  style={{ backgroundColor: '#656B5B' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Enviar Email
                </Link>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-500 text-center">
                  <strong>Teléfono:</strong><br />
                  +54 9 383 494-6767
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}