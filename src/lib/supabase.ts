import { createBrowserClient, createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// The new Supabase key format calls this the "publishable" key; it's a
// drop-in replacement for the legacy "anon" key. Accept either env var
// name so deployments only need to set one.
const SUPABASE_CLIENT_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && SUPABASE_CLIENT_KEY);
}

export function supabaseBrowser(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_CLIENT_KEY!);
}

// Server-side client for Server Components / Route Handlers.
// Must be called within a request scope (uses next/headers cookies).
export async function supabaseServer(): Promise<SupabaseClient | null> {
  if (!isSupabaseConfigured()) return null;
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_CLIENT_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Called from a Server Component — session refresh is
          // handled by middleware instead.
        }
      },
    },
  });
}
