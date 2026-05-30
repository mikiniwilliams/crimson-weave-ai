import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Browser-safe Supabase client. Uses the public ANON key only.
// Never put a service-role key in client code or in any VITE_-prefixed env var.

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (cached) return cached;
  cached = createClient(url, anonKey, {
    auth: { persistSession: false },
  });
  return cached;
}

export function hasSupabaseEnv(): boolean {
  return Boolean(url && anonKey);
}
