import { supabase } from "@/lib/supabase";
import Link from "next/link";
import AlquilerCard from "@/components/AlquilerCard";

export default async function Alquileres() {
    const db = supabase();
    const { data: alquileres, error } = await db
        .from("alquileres")
        .select("*")
        .eq("activo", 1)
        .order("id");

    console.log({ alquileres, error });

    if (error) {
        return (
            <div className="container mx-auto p-8">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error cargando datos: </strong>
                    <span className="block sm:inline">{error.message}</span>
                    <pre className="mt-2 text-xs">{JSON.stringify(error, null, 2)}</pre>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Alojamientos Disponibles
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Encuentra el lugar perfecto para tu descanso. Comodidad, naturaleza y las mejores vistas te esperan.
                </p>
            </div>

            {!alquileres || alquileres.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <p className="text-xl text-gray-600 font-medium">No hay alojamientos disponibles por el momento.</p>
                    <p className="text-gray-500 mt-2">Por favor, vuelve a intentar más tarde.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {alquileres.map((a) => (
                        <AlquilerCard key={a.id} alquiler={a} />
                    ))}
                </div>
            )}
        </div>
    );
}
