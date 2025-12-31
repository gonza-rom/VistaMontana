import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          res.cookies.delete({ name, ...options });
        }
      }
    }
  );

  const { data } = await supabase.auth.getUser();

  const protectedRoutes = ["/admin"];
  const privateRoute = protectedRoutes.some((r) =>
    req.nextUrl.pathname.startsWith(r)
  );

  if (privateRoute && !data.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/admin"]
};
