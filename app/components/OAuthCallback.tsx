"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase-browser";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const hasCode = url.searchParams.has("code");
    const hasError = url.searchParams.has("error_description");

    if (!hasCode && !hasError) return;

    supabaseBrowser()
      .auth.exchangeCodeForSession(window.location.search)
      .then(({ error }) => {
        if (error) {
          console.error("exchangeCodeForSession error:", error.message);
        }
      })
      .finally(() => {
        url.searchParams.delete("code");
        url.searchParams.delete("state");
        url.searchParams.delete("error");
        url.searchParams.delete("error_description");
        window.history.replaceState({}, document.title, url.toString());
        router.refresh();
      });
  }, [router]);

  return null;
}
