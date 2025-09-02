"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await supabaseServer();
  // Clear the Supabase session cookies
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Supabase signOut error:", error.message);
  }
  redirect("/login");
}
