"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const linkClass = (href) =>
    pathname === href
      ? "font-semibold text-blue-600"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="flex items-center space-x-3 group">
          <Image
            src="/logo-montana.png"
            alt="Hospedaje Vista Montaña"
            width={64}
            height={64}
            className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-2xl font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600">
            Vista Montaña
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg">
          <Link href="/" className={linkClass("/")}>
            Inicio
          </Link>
          <Link href="/alquileres" className={linkClass("/alquileres")}>
            Alquileres
          </Link>
          <Link href="/galeria" className={linkClass("/galeria")}>
            Galería
          </Link>
          <Link href="/turismo" className={linkClass("/turismo")}>
            Turismo
          </Link>
          <Link href="/contacto" className={linkClass("/contacto")}>
            Contacto
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
          <div className="flex flex-col space-y-3">
            <Link
              href="/"
              className={`py-2 px-3 rounded-lg transition-colors ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/alquileres"
              className={`py-2 px-3 rounded-lg transition-colors ${
                isActive("/alquileres")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Alquileres
            </Link>
            <Link
              href="/galeria"
              className={`py-2 px-3 rounded-lg transition-colors ${
                isActive("/galeria")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Galería
            </Link>
            <Link
              href="/turismo"
              className={`py-2 px-3 rounded-lg transition-colors ${
                isActive("/turismo")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Turismo
            </Link>
            <Link
              href="/contacto"
              className={`py-2 px-3 rounded-lg transition-colors ${
                isActive("/contacto")
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}