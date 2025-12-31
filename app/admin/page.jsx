import { supabase } from "@/lib/supabase";

export default async function Admin() {
  const { data: reservas } = await supabase.from("reservas").select("*");

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Panel administrador</h1>
      <p className="text-gray-600 mb-8">
        Gestioná reservas, pagos y disponibilidad.
      </p>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Entrada</th>
            <th className="p-2 border">Salida</th>
            <th className="p-2 border">Personas</th>
          </tr>
        </thead>
        <tbody>
          {reservas?.map((r) => (
            <tr key={r.id}>
              <td className="p-2 border">{r.nombre_cliente}</td>
              <td className="p-2 border">{r.fecha_entrada}</td>
              <td className="p-2 border">{r.fecha_salida}</td>
              <td className="p-2 border">{r.cantidad_personas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
