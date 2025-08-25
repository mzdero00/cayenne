// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          res.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          res.cookies.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  // 👇 This exchanges ?code=... for a session and sets the auth cookies
  await supabase.auth.getSession();

  // Optional: clean the URL after OAuth
  const url = new URL(req.url);
  if (url.searchParams.has("code")) {
    url.searchParams.delete("code");
    return NextResponse.redirect(url, { headers: res.headers });
  }

  return res;
}

// Run for all pages (skip static assets)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
