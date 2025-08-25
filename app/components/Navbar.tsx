// app/components/Navbar.tsx (SERVER)
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabaseServer } from "@/lib/supabase-server";
import NavbarClient from "./NavbarClient";
import NavbarFrame from "./NavbarFrame";

type DbItem = {
  label: string;
  href: string;
  area: "main" | "user" | "footer";
  sort_order: number;
  require_auth: boolean;
  roles: string[];
  external: boolean;
  target_blank: boolean;
  icon: string | null;
};

export default async function Navbar({ solid = false }: { solid?: boolean }) {
  const supabase = await supabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const appRoles = (user?.app_metadata?.roles as string[] | undefined) ?? [];

  const { data: rows } = await supabase
    .from("navigation_items")
    .select(
      "label,href,area,sort_order,require_auth,roles,external,target_blank,icon"
    )
    .eq("area", "main")
    .eq("visible", true)
    .order("sort_order", { ascending: true });

  const items: DbItem[] = ((rows ?? []) as DbItem[]).filter((it) => {
    if (it.require_auth && !user) return false;

    // roles may be null/undefined or an empty array
    if (Array.isArray(it.roles) && it.roles.length > 0) {
      if (!user) return false;
      const overlap = it.roles.some((role: string) => appRoles.includes(role));
      if (!overlap) return false;
    }

    return true;
  });

  const u = user
    ? {
        id: user.id,
        name:
          (user.user_metadata?.full_name as string | null) ??
          user.email?.split("@")[0] ??
          "User",
      }
    : null;

  return (
    <NavbarFrame solid={solid}>
      <NavbarClient user={u} items={items} />
    </NavbarFrame>
  );
}
