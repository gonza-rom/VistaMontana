"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: '/patio-6.avif',
      title: 'Hospedaje Vista Montaña',
      subtitle: 'Tu refugio en las sierras de Catamarca',
      cta: 'Ver Alojamientos',
      link: '/alquileres'
    },
    {
      image: '/salton-1.avif',
      title: 'Cerca de El Saltón',
      subtitle: 'A minutos de la cascada más impresionante',
      cta: 'Descubrir Más',
      link: '/turismo'
    },
    {
      image: '/montanas-2.avif',
      title: 'Naturaleza y Tranquilidad',
      subtitle: 'Despertá rodeado de paisajes increíbles',
      cta: 'Ver Galería',
      link: '/galeria'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index === 0}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center animate-slide-up">
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 drop-shadow-2xl"
                style={{ color: 'white' }}
              >
                {slide.title}
              </h1>
              <p 
                className="text-xl md:text-3xl mb-8 md:mb-12 drop-shadow-lg max-w-3xl mx-auto"
                style={{ color: 'white' }}
              >
                {slide.subtitle}
              </p>
              <Link
                href={slide.link}
                className="inline-block px-8 md:px-12 py-4 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ backgroundColor: 'white', color: '#656B5B' }}
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10 hover:scale-110"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
        aria-label="Anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 backdrop-blur-sm p-3 rounded-full transition-all duration-300 z-10 hover:scale-110"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white' }}
        aria-label="Siguiente"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="transition-all duration-300 rounded-full"
            style={{
              width: index === currentSlide ? '48px' : '12px',
              height: '12px',
              backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)'
            }}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}