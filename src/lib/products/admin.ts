import { getSupabase } from "@/lib/supabase/client";
import {
  mapRowToProduct,
  mapProductToWriteRow,
  type Product,
  type ProductRow,
} from "./types";

// All admin CRUD goes through the anon-key Supabase client.
// Writes only succeed when an authenticated session is attached AND the
// RLS policies in supabase/migrations/002_products_admin.sql allow them.

function client() {
  const sb = getSupabase();
  if (!sb) {
    throw new Error(
      "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
    );
  }
  return sb;
}

export async function loadAllProductsForAdmin(): Promise<Product[]> {
  const sb = client();
  const { data, error } = await sb
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return ((data ?? []) as ProductRow[]).map(mapRowToProduct);
}

export type ProductDraft = Omit<Product, "id" | "createdAt" | "updatedAt">;

export async function createProduct(draft: ProductDraft): Promise<Product> {
  const sb = client();
  const { data, error } = await sb
    .from("products")
    .insert(mapProductToWriteRow(draft))
    .select("*")
    .single();
  if (error) throw error;
  return mapRowToProduct(data as ProductRow);
}

export async function updateProduct(
  id: string,
  draft: ProductDraft
): Promise<Product> {
  const sb = client();
  const { data, error } = await sb
    .from("products")
    .update(mapProductToWriteRow(draft))
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return mapRowToProduct(data as ProductRow);
}

// Minimal one-or-two-field updates. Used for fast toggles (featured / status).
const CAMEL_TO_SNAKE: Record<keyof ProductDraft, string> = {
  title: "title",
  category: "category",
  description: "description",
  price: "price",
  ctaLabel: "cta_label",
  featured: "featured",
  status: "status",
  image: "image_url",
  slug: "slug",
  stripePaymentLink: "stripe_payment_link",
  stripePriceId: "stripe_price_id",
  isPaidProduct: "is_paid_product",
  deliveryType: "delivery_type",
  sortOrder: "sort_order",
};

export async function patchProduct(
  id: string,
  patch: Partial<ProductDraft>
): Promise<Product> {
  const sb = client();
  const row: Record<string, unknown> = {};
  for (const [camel, value] of Object.entries(patch) as [keyof ProductDraft, unknown][]) {
    const snake = CAMEL_TO_SNAKE[camel];
    if (snake) row[snake] = value;
  }
  const { data, error } = await sb
    .from("products")
    .update(row)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return mapRowToProduct(data as ProductRow);
}

export async function deleteProduct(id: string): Promise<void> {
  const sb = client();
  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) throw error;
}
