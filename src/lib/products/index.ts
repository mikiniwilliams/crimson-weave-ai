import { getSupabase, hasSupabaseEnv } from "@/lib/supabase/client";
import { mapRowToProduct, type Product, type ProductRow } from "./types";
import { localProducts } from "./local-products";

export type { Product, ProductDeliveryType, ProductStatus } from "./types";

// Single product lookup by slug. Falls back to local data when Supabase is
// unconfigured or the query fails. Returns null if no product is found.
export async function loadProductBySlug(slug: string): Promise<Product | null> {
  if (!hasSupabaseEnv()) {
    return localProducts.find((p) => p.slug === slug && p.status === "active") ?? null;
  }
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();
  if (error) {
    console.warn("[products] loadProductBySlug failed:", error.message);
    return localProducts.find((p) => p.slug === slug && p.status === "active") ?? null;
  }
  if (!data) return null;
  return mapRowToProduct(data as ProductRow);
}

// Load all active products. If Supabase env vars are present, query the live table.
// If they're missing (local dev), fall back to bundled localProducts so the public
// site never breaks.
export async function loadActiveProducts(): Promise<Product[]> {
  if (!hasSupabaseEnv()) {
    console.log("Using local products (Supabase env vars not set)");
    const products = localProducts
      .filter((p) => p.status === "active")
      .sort((a, b) => a.sortOrder - b.sortOrder);
    console.log(products);
    return products;
  }

  const sb = getSupabase();
  if (!sb) return localProducts;

  const { data, error } = await sb
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (error) {
    // If the query fails (e.g. table missing during initial setup), fall back
    // to local data rather than rendering an empty Vault.
    console.warn("[products] Supabase query failed, using local fallback:", error.message);
    return localProducts;
  }

  const rows = (data ?? []) as ProductRow[];
  console.log(`Using Supabase products (${rows.length} active row${rows.length === 1 ? "" : "s"})`);
  if (rows.length === 0) {
    console.warn(
      "[products] Supabase returned 0 active products. " +
      "Check: (1) at least one row exists in public.products with status='active', " +
      "(2) the anon 'Public can read active products' RLS policy is enabled."
    );
  }
  const products = rows.map(mapRowToProduct);
  console.log(products);
  return products;
}
