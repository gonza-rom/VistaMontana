"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();

  const linkClass = (href) =>
    path === href
      ? "font-semibold text-blue-600"
      : "text-gray-700 hover:text-blue-500";

  return (
    <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="font-bold text-2xl">
          VistaMontaña
        </Link>

        <div className="space-x-6 text-lg">
          <Link href="/alquileres" className={linkClass("/alquileres")}>
            Alquileres
          </Link>
          <Link href="/turismo" className={linkClass("/turismo")}>
            Turismo
          </Link>
          <Link href="/contacto" className={linkClass("/contacto")}>
            Contacto
          </Link>
          <Link href="/login" className={linkClass("/login")}>
            Ingresar
          </Link>
        </div>
      </div>
    </nav>
  );
}
