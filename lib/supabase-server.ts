// lib/supabase-server.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/** A minimal type for a cookie store that *may* support writes */
type CookieSetterFn = (name: string, value: string, options?: unknown) => void;
type MaybeWritableCookies = { set?: CookieSetterFn };

export async function supabaseServer() {
  // Next.js 15: cookies() is async
  const cookieStore = await cookies();

  // Helper that calls .set only when available (Server Action / Route Handler).
  const trySet = (name: string, value: string, options?: CookieOptions) => {
    const writable = cookieStore as unknown as MaybeWritableCookies;
    if (typeof writable.set === "function") {
      // pass options as unknown to satisfy possible runtime overloads
      (writable.set as CookieSetterFn)(name, value, options as unknown);
    }
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // Safe no-op during plain RSC/SSR; works in Server Actions/Routes
          trySet(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          // Mirror Supabase's expected behavior: set maxAge: 0
          const opts = { ...(options as Record<string, unknown>), maxAge: 0 };
          trySet(name, "", opts as unknown as CookieOptions);
        },
      },
    }
  );
}
