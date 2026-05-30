import { getSupabase, hasSupabaseEnv } from "@/lib/supabase/client";
import { mapRowToProduct, type Product, type ProductRow } from "./types";
import { localProducts } from "./local-products";

export type { Product, ProductDeliveryType, ProductStatus } from "./types";

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

  console.log("Using Supabase products");
  const products = ((data ?? []) as ProductRow[]).map(mapRowToProduct);
  console.log(products);
  return products;
}
