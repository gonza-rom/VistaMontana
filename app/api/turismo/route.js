import { supabase } from "@/lib/supabase";

export async function GET() {
  const db = supabase();
  const { data } = await db.from("lugares_turisticos").select("*");
  return Response.json(data);
}
