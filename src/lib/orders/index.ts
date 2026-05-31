import { getSupabase } from "@/lib/supabase/client";
import { mapRowToProduct, type Product, type ProductRow } from "@/lib/products/types";

export interface OrderWithProduct {
  id: string;
  stripeSessionId: string | null;
  status: "pending" | "succeeded" | "failed" | "refunded";
  amountTotal: number | null;
  currency: string;
  createdAt: string;
  product: Product | null;
  productSlug: string | null;
}

interface RawOrderRow {
  id: string;
  stripe_session_id: string | null;
  status: "pending" | "succeeded" | "failed" | "refunded";
  amount_total: number | null;
  currency: string;
  created_at: string;
  product_id: string | null;
  product_slug: string | null;
  products: ProductRow | null;
}

// Loads the signed-in customer's orders + their linked product rows in one query.
// RLS (migration 004) ensures users only see rows where customer_email = auth.email().
export async function loadMyOrders(): Promise<OrderWithProduct[]> {
  const sb = getSupabase();
  if (!sb) return [];

  const { data, error } = await sb
    .from("orders")
    .select(
      `id,
       stripe_session_id,
       status,
       amount_total,
       currency,
       created_at,
       product_id,
       product_slug,
       products ( * )`
    )
    .eq("status", "succeeded")
    .order("created_at", { ascending: false });

  if (error) {
    console.warn("[orders] loadMyOrders failed:", error.message);
    return [];
  }

  return ((data ?? []) as unknown as RawOrderRow[]).map((row) => ({
    id: row.id,
    stripeSessionId: row.stripe_session_id,
    status: row.status,
    amountTotal: row.amount_total,
    currency: row.currency,
    createdAt: row.created_at,
    productSlug: row.product_slug,
    product: row.products ? mapRowToProduct(row.products) : null,
  }));
}
