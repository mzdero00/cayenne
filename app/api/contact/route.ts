import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function POST(req: NextRequest) {
  try {
    
    const form = await req.formData();
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    
    const res = NextResponse.json({ ok: true });
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

    
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("contact_messages").insert([
      {
        name,
        email,
        phone: phone || null,
        message,
        user_id: user?.id ?? null,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { ok: false, error: "Failed to send your message." },
        { status: 500 }
      );
    }

  
    return res;

} catch (e: unknown) {
  const msg = e instanceof Error ? e.message : String(e);
  console.error("Contact API error:", msg);
  return NextResponse.json(
    { ok: false, error: "Unexpected error." },
    { status: 500 }
  );
}

}
