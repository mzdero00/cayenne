// lib/supabase-server.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function supabaseServer() {
  // Next.js 15: cookies() is async
  const cookieStore = await cookies(); // -> ReadonlyRequestCookies

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // safe in all server contexts
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Only works in write-capable contexts (Server Action / Route Handler).
          // During SSR/RSC this will throw; we swallow it.
          try {
            (cookieStore as any).set({ name, value, ...options });
          } catch {
            /* ignore writes outside Server Actions */
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            (cookieStore as any).set({
              name,
              value: "",
              ...options,
              maxAge: 0,
            });
          } catch {
            /* ignore writes outside Server Actions */
          }
        },
      },
    }
  );
}
