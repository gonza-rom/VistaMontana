"use client";
import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("/api/contacto", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setSubmitted(true);
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Contacto</h2>

      {submitted ? (
        <p className="text-green-600 text-lg">Gracias por tu mensaje. Nos contactaremos pronto.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="border px-4 py-2 w-full rounded"
            placeholder="Nombre"
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />
          <input
            className="border px-4 py-2 w-full rounded"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            className="border px-4 py-2 w-full rounded"
            placeholder="Mensaje"
            rows="4"
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          />

          <button className="px-5 py-2 bg-blue-600 text-white rounded">
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}
