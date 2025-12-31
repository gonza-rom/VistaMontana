// lib/supabase-server.js
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export function supabaseServer() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { cookies }
  );
}
