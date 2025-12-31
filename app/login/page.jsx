"use client";
import { useState } from "react";
import supabase from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });
    if (!error) router.push("/admin");
  }

  return (
    <div className="max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4 text-center">Ingresar</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          className="border px-4 py-2 w-full rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border px-4 py-2 w-full rounded"
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPass(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Entrar
        </button>
      </form>
    </div>
  );
}
