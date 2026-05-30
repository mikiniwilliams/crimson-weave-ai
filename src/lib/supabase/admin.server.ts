// Server-only Supabase admin client. Uses the SERVICE_ROLE key, which
// bypasses Row-Level Security. NEVER import this from client code — the
// .server.ts suffix tells Vite to strip it from the client bundle.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getServerConfig } from "@/lib/config.server";

let cached: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const cfg = getServerConfig();
  if (!cfg.supabaseUrl || !cfg.supabaseServiceRoleKey) return null;
  if (cached) return cached;
  cached = createClient(cfg.supabaseUrl, cfg.supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
