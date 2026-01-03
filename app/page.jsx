import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";

export default function Home() {
  return (
    <div>
      {/* Hero Section with Carousel */}
      {/* <HeroCarousel /> */}

      {/* Características con imágenes */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/galeria" className="text-center hover-lift p-8 rounded-2xl bg-white shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="relative mb-6 overflow-hidden rounded-2xl h-48">
                <Image
                  src="/montañas-2.jpg"
                  alt="Vistas increíbles de las montañas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-6xl">🏔️</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Vistas Increíbles</h3>
              <p className="text-gray-600 leading-relaxed">
                Despertá rodeado de las hermosas sierras de Catamarca
              </p>
            </Link>

            <Link href="/galeria" className="text-center hover-lift p-8 rounded-2xl bg-white shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="relative mb-6 overflow-hidden rounded-2xl h-48">
                <Image
                  src="/salton-1.jpg"
                  alt="Cascada El Saltón"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-6xl">💧</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Cerca de El Saltón</h3>
              <p className="text-gray-600 leading-relaxed">
                A solo minutos de la cascada más impresionante de la zona
              </p>
            </Link>

            <Link href="/galeria" className="text-center hover-lift p-8 rounded-2xl bg-white shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="relative mb-6 overflow-hidden rounded-2xl h-48">
                <Image
                  src="/habitacion-1.jpg"
                  alt="Habitaciones cómodas"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-6xl">🏠</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Comodidad Total</h3>
              <p className="text-gray-600 leading-relaxed">
                Habitaciones equipadas y posibilidad de alquilar la casa completa
              </p>
            </Link>

            <Link href="/alquileres" className="text-center hover-lift p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg transition-all duration-300 group cursor-pointer border-2 border-blue-200">
              <div className="relative mb-6 flex items-center justify-center h-48">
                <div className="text-8xl animate-pulse">📡</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">WiFi Starlink</h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                Internet de alta velocidad en plena montaña
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Sobre el hospedaje con video */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                Naturaleza y Tranquilidad
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Hospedaje Vista Montaña está ubicado en Balcozna, un paraíso natural
                en el corazón de las sierras de Catamarca. Ofrecemos alojamiento
                cómodo y acogedor para que puedas disfrutar de la belleza del paisaje
                montañoso.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Podés elegir entre nuestras habitaciones individuales o alquilar
                la casa completa para grupos más grandes. Todas nuestras instalaciones
                están diseñadas para que te sientas como en casa mientras explorás
                los tesoros naturales de la región.
              </p>
              <Link
                href="/alquileres"
                className="inline-block px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:scale-105 hover-glow"
                style={{
                  background: 'linear-gradient(135deg, #2D5F3F 0%, #4A8B5C 100%)'
                }}
              >
                Ver Opciones de Alojamiento
              </Link>
            </div>
            <div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                <div className="relative rounded-2xl shadow-2xl overflow-hidden aspect-[9/16]">
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
            </div>
          </div>
        </div>
      </section>

      {/* Galería rápida con link */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Galería
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Descubrí más fotos de nuestro hospedaje y los lugares que podés visitar
            </p>
            <Link
              href="/galeria"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-glow shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #2D5F3F 0%, #4A8B5C 100%)'
              }}
            >
              <span>Ver Galería Completa</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { src: '/patio-1.webp', alt: 'Patio principal' },
              { src: '/patio-2.jpg', alt: 'Patio exterior' },
              { src: '/habitacion-2.jpg', alt: 'Habitación confortable' },
              { src: '/quincho-2.jpg', alt: 'Quincho' }
            ].map((image, index) => (
              <Link
                key={index}
                href="/galeria"
                className="group relative overflow-hidden rounded-2xl shadow-lg hover-lift"
              >
                <div className="relative h-64">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <p className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.alt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(135deg, #2D5F3F 0%, #4A8B5C 50%, #D97642 100%)', opacity: 0.9}}></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para tu próxima aventura?
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Contactanos para conocer disponibilidad y reservar tu estadía en las sierras de Catamarca
          </p>
          <Link
            href="/contacto"
            className="inline-block px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
}