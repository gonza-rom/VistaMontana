import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6">Vista Montaña</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
        Hospedaje en Balcozna · Naturaleza · Aire puro · Serenidad · Ideal para familias
      </p>

      <Link
        href="/alquileres"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700"
      >
        Ver alojamientos
      </Link>
    </section>
  );
}
