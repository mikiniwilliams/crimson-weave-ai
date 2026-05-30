// Product domain model used across the site (Vault, future admin, future product pages).
// Frontend uses camelCase. The Supabase mapper translates to/from snake_case at the boundary.

export type ProductDeliveryType = "download" | "booking" | "community" | "workshop";

export type ProductStatus = "draft" | "active" | "archived";

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  ctaLabel: string;
  featured: boolean;
  status: ProductStatus;
  image: string | null;
  slug: string;
  stripePaymentLink: string | null;
  stripePriceId: string | null;
  isPaidProduct: boolean;
  deliveryType: ProductDeliveryType;
  sortOrder: number;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

// Raw row shape as it lives in Supabase (snake_case).
export interface ProductRow {
  id: string;
  title: string;
  category: string;
  description: string;
  price: string;
  cta_label: string;
  featured: boolean;
  status: ProductStatus;
  image_url: string | null;
  slug: string;
  stripe_payment_link: string | null;
  stripe_price_id: string | null;
  is_paid_product: boolean;
  delivery_type: ProductDeliveryType;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export function mapRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    description: row.description,
    price: row.price,
    ctaLabel: row.cta_label,
    featured: row.featured,
    status: row.status,
    image: row.image_url,
    slug: row.slug,
    stripePaymentLink: row.stripe_payment_link,
    stripePriceId: row.stripe_price_id,
    isPaidProduct: row.is_paid_product,
    deliveryType: row.delivery_type,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Insertable subset — id/created_at/updated_at are filled by the DB on insert.
export type ProductWriteRow = Omit<ProductRow, "id" | "created_at" | "updated_at">;

export function mapProductToWriteRow(p: Omit<Product, "id" | "createdAt" | "updatedAt">): ProductWriteRow {
  return {
    title: p.title,
    category: p.category,
    description: p.description,
    price: p.price,
    cta_label: p.ctaLabel,
    featured: p.featured,
    status: p.status,
    image_url: p.image,
    slug: p.slug,
    stripe_payment_link: p.stripePaymentLink,
    stripe_price_id: p.stripePriceId,
    is_paid_product: p.isPaidProduct,
    delivery_type: p.deliveryType,
    sort_order: p.sortOrder,
  };
}
