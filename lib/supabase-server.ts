
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";


type CookieSetterFn = (name: string, value: string, options?: unknown) => void;
type MaybeWritableCookies = { set?: CookieSetterFn };

export async function supabaseServer() {
  
  const cookieStore = await cookies();

  
  const trySet = (name: string, value: string, options?: CookieOptions) => {
    const writable = cookieStore as unknown as MaybeWritableCookies;
    if (typeof writable.set === "function") {
      
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
          
          trySet(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          
          const opts = { ...(options as Record<string, unknown>), maxAge: 0 };
          trySet(name, "", opts as unknown as CookieOptions);
        },
      },
    }
  );
}
