"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";

export default function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      type="button"
      disabled={busy}
      onClick={async () => {
        setBusy(true);
        await supabaseBrowser()?.auth.signOut();
        router.push("/admin/login");
        router.refresh();
      }}
      className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-200 hover:bg-white/10 disabled:opacity-50"
    >
      🚪 {busy ? "Signing out…" : "Logout"}
    </button>
  );
}
