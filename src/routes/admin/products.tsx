import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth, signInWithPassword, signOut } from "@/lib/supabase/auth";
import {
  createProduct,
  deleteProduct,
  loadAllProductsForAdmin,
  patchProduct,
  updateProduct,
  type ProductDraft,
} from "@/lib/products/admin";
import type { Product, ProductDeliveryType, ProductStatus } from "@/lib/products/types";

export const Route = createFileRoute("/admin/products")({
  head: () => ({
    meta: [
      { title: "Vault Admin — The AI Vision Weaver" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminProductsPage,
});

const emptyDraft: ProductDraft = {
  title: "",
  category: "",
  description: "",
  price: "",
  ctaLabel: "View Product",
  featured: false,
  status: "draft",
  image: null,
  slug: "",
  stripePaymentLink: null,
  stripePriceId: null,
  isPaidProduct: true,
  deliveryType: "download",
  sortOrder: 0,
};

const DELIVERY_TYPES: ProductDeliveryType[] = ["download", "booking", "community", "workshop"];
const STATUSES: ProductStatus[] = ["draft", "active", "archived"];

function AdminProductsPage() {
  const auth = useAuth();

  if (auth.status === "loading") {
    return <Shell><p style={muted}>Loading…</p></Shell>;
  }

  if (auth.status === "unconfigured") {
    return (
      <Shell>
        <p style={muted}>
          Supabase isn't configured. Set <code>VITE_SUPABASE_URL</code> and{" "}
          <code>VITE_SUPABASE_ANON_KEY</code> and redeploy.
        </p>
      </Shell>
    );
  }

  if (auth.status === "signed-out") {
    return <Shell><LoginForm /></Shell>;
  }

  return (
    <Shell signedInAs={auth.user.email ?? "admin"}>
      <ProductsManager />
    </Shell>
  );
}

// ---------- Layout shell ----------

function Shell({ children, signedInAs }: { children: React.ReactNode; signedInAs?: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        color: "var(--espresso)",
        fontFamily: "var(--font-sans)",
        padding: "2.5rem 1.5rem 4rem",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid oklch(0.78 0.13 80 / 0.3)",
          }}
        >
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)" }}>
              The AI Vision Weaver
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", margin: "0.25rem 0 0" }}>
              Vault <span style={{ color: "var(--crimson)" }}>Admin</span>
            </h1>
          </div>
          {signedInAs && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "oklch(0.48 0.04 40)" }}>{signedInAs}</div>
              <button
                onClick={() => signOut()}
                style={ghostBtn}
              >
                Sign out
              </button>
            </div>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}

// ---------- Login ----------

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await signInWithPassword(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={card}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", margin: 0 }}>Sign in</h2>
      <p style={{ ...muted, marginTop: 4 }}>Authenticated users only.</p>
      <form onSubmit={onSubmit} style={{ marginTop: "1.25rem", display: "grid", gap: "0.85rem" }}>
        <label style={labelStyle}>
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />
        </label>
        <label style={labelStyle}>
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
        </label>
        {error && <div style={{ ...errorBox }}>{error}</div>}
        <button type="submit" disabled={busy} style={primaryBtn}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

// ---------- Products manager ----------

function ProductsManager() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    loadAllProductsForAdmin()
      .then((rows) => {
        if (!cancelled) setProducts(rows);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load products.");
        setProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshTick]);

  const refresh = () => setRefreshTick((t) => t + 1);

  const onToggle = async (
    p: Product,
    key: "featured" | "status"
  ) => {
    try {
      if (key === "featured") {
        await patchProduct(p.id, { featured: !p.featured });
      } else {
        await patchProduct(p.id, {
          status: p.status === "active" ? "draft" : "active",
        });
      }
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    }
  };

  const onDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    try {
      await deleteProduct(p.id);
      refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    }
  };

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={muted}>
          {products === null
            ? "Loading…"
            : `${products.length} product${products.length === 1 ? "" : "s"} in the Vault`}
        </p>
        <button onClick={() => setEditingId("new")} style={primaryBtn}>
          + New product
        </button>
      </div>

      {error && (
        <div style={errorBox}>
          {error}
          <div style={{ ...muted, marginTop: 8, fontSize: 12 }}>
            If writes fail with "row-level security" or 403, run{" "}
            <code>supabase/migrations/002_products_admin.sql</code> in your Supabase project.
          </div>
        </div>
      )}

      {editingId === "new" && (
        <ProductEditor
          initial={emptyDraft}
          title="New product"
          onCancel={() => setEditingId(null)}
          onSave={async (draft) => {
            await createProduct(draft);
            setEditingId(null);
            refresh();
          }}
        />
      )}

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {(products ?? []).map((p) => (
          <ProductRow
            key={p.id}
            product={p}
            isEditing={editingId === p.id}
            onEdit={() => setEditingId(p.id)}
            onCancel={() => setEditingId(null)}
            onToggleFeatured={() => onToggle(p, "featured")}
            onToggleStatus={() => onToggle(p, "status")}
            onDelete={() => onDelete(p)}
            onSave={async (draft) => {
              await updateProduct(p.id, draft);
              setEditingId(null);
              refresh();
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ProductRow({
  product,
  isEditing,
  onEdit,
  onCancel,
  onToggleFeatured,
  onToggleStatus,
  onDelete,
  onSave,
}: {
  product: Product;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onToggleFeatured: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  onSave: (draft: ProductDraft) => Promise<void>;
}) {
  if (isEditing) {
    const draft: ProductDraft = {
      title: product.title,
      category: product.category,
      description: product.description,
      price: product.price,
      ctaLabel: product.ctaLabel,
      featured: product.featured,
      status: product.status,
      image: product.image,
      slug: product.slug,
      stripePaymentLink: product.stripePaymentLink,
      stripePriceId: product.stripePriceId,
      isPaidProduct: product.isPaidProduct,
      deliveryType: product.deliveryType,
      sortOrder: product.sortOrder,
    };
    return (
      <ProductEditor
        initial={draft}
        title={`Edit "${product.title}"`}
        onCancel={onCancel}
        onSave={onSave}
      />
    );
  }

  const statusColor =
    product.status === "active"
      ? "oklch(0.55 0.15 145)"
      : product.status === "draft"
      ? "oklch(0.48 0.04 40)"
      : "oklch(0.55 0.18 25)";

  return (
    <div style={{ ...card, padding: "1rem 1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", margin: 0 }}>{product.title}</h3>
            {product.featured && <Pill color="var(--gold)">Featured</Pill>}
            <Pill color={statusColor}>{product.status}</Pill>
            <Pill color="oklch(0.48 0.04 40)">{product.category || "uncategorized"}</Pill>
          </div>
          <p style={{ ...muted, marginTop: 6, fontSize: 13 }}>{product.description}</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: 6, fontSize: 12, color: "oklch(0.48 0.04 40)" }}>
            <span>{product.price}</span>
            <span>/{product.slug || "—"}</span>
            <span>delivery: {product.deliveryType}</span>
            <span>order: {product.sortOrder}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button onClick={onToggleStatus} style={ghostBtn}>
            {product.status === "active" ? "Deactivate" : "Activate"}
          </button>
          <button onClick={onToggleFeatured} style={ghostBtn}>
            {product.featured ? "Unfeature" : "Feature"}
          </button>
          <button onClick={onEdit} style={primaryBtn}>Edit</button>
          <button onClick={onDelete} style={dangerBtn}>Delete</button>
        </div>
      </div>
    </div>
  );
}

function Pill({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color,
        border: `1px solid ${color}`,
        borderRadius: 999,
        padding: "2px 8px",
        background: "transparent",
      }}
    >
      {children}
    </span>
  );
}

// ---------- Editor (used for both create and edit) ----------

function ProductEditor({
  initial,
  title,
  onCancel,
  onSave,
}: {
  initial: ProductDraft;
  title: string;
  onCancel: () => void;
  onSave: (draft: ProductDraft) => Promise<void>;
}) {
  const [draft, setDraft] = useState<ProductDraft>(initial);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof ProductDraft>(key: K, value: ProductDraft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await onSave({
        ...draft,
        // Normalize empty strings to null for nullable fields.
        image: draft.image?.trim() ? draft.image : null,
        stripePaymentLink: draft.stripePaymentLink?.trim() ? draft.stripePaymentLink : null,
        stripePriceId: draft.stripePriceId?.trim() ? draft.stripePriceId : null,
        slug: draft.slug.trim() || slugify(draft.title),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} style={{ ...card, padding: "1.5rem" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", margin: 0 }}>{title}</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.85rem", marginTop: "1rem" }}>
        <label style={labelStyle}>
          <span>Title</span>
          <input required value={draft.title} onChange={(e) => set("title", e.target.value)} style={input} />
        </label>
        <label style={labelStyle}>
          <span>Category</span>
          <input required value={draft.category} onChange={(e) => set("category", e.target.value)} style={input} />
        </label>
        <label style={{ ...labelStyle, gridColumn: "1 / -1" }}>
          <span>Description</span>
          <textarea
            required
            value={draft.description}
            onChange={(e) => set("description", e.target.value)}
            style={{ ...input, minHeight: 80, resize: "vertical" }}
          />
        </label>
        <label style={labelStyle}>
          <span>Price (display string, e.g. $47)</span>
          <input required value={draft.price} onChange={(e) => set("price", e.target.value)} style={input} />
        </label>
        <label style={labelStyle}>
          <span>CTA label</span>
          <input required value={draft.ctaLabel} onChange={(e) => set("ctaLabel", e.target.value)} style={input} />
        </label>
        <label style={labelStyle}>
          <span>Slug (auto-generated if blank)</span>
          <input value={draft.slug} onChange={(e) => set("slug", e.target.value)} style={input} />
        </label>
        <label style={labelStyle}>
          <span>Image URL</span>
          <input value={draft.image ?? ""} onChange={(e) => set("image", e.target.value || null)} style={input} />
        </label>
        <label style={labelStyle}>
          <span>Stripe payment link</span>
          <input value={draft.stripePaymentLink ?? ""} onChange={(e) => set("stripePaymentLink", e.target.value || null)} style={input} />
        </label>
        <label style={labelStyle}>
          <span>Stripe price ID</span>
          <input value={draft.stripePriceId ?? ""} onChange={(e) => set("stripePriceId", e.target.value || null)} style={input} />
        </label>
        <label style={labelStyle}>
          <span>Delivery type</span>
          <select
            value={draft.deliveryType}
            onChange={(e) => set("deliveryType", e.target.value as ProductDeliveryType)}
            style={input}
          >
            {DELIVERY_TYPES.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          <span>Status</span>
          <select
            value={draft.status}
            onChange={(e) => set("status", e.target.value as ProductStatus)}
            style={input}
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </label>
        <label style={labelStyle}>
          <span>Sort order</span>
          <input
            type="number"
            value={draft.sortOrder}
            onChange={(e) => set("sortOrder", Number(e.target.value))}
            style={input}
          />
        </label>
        <label style={{ ...labelStyle, flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={draft.isPaidProduct}
            onChange={(e) => set("isPaidProduct", e.target.checked)}
          />
          <span>Paid product</span>
        </label>
        <label style={{ ...labelStyle, flexDirection: "row", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={draft.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          <span>Featured</span>
        </label>
      </div>

      {error && <div style={{ ...errorBox, marginTop: "1rem" }}>{error}</div>}

      <div style={{ marginTop: "1.25rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
        <button type="button" onClick={onCancel} style={ghostBtn}>Cancel</button>
        <button type="submit" disabled={busy} style={primaryBtn}>
          {busy ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "product";
}

// ---------- Shared styles ----------

const card: React.CSSProperties = {
  background: "oklch(0.985 0.012 80 / 0.9)",
  border: "1px solid oklch(0.78 0.13 80 / 0.35)",
  borderRadius: 16,
  padding: "1.5rem",
  boxShadow: "0 1px 0 oklch(1 0 0 / 0.7) inset, 0 10px 30px -20px oklch(0.30 0.11 22 / 0.35)",
};

const muted: React.CSSProperties = {
  color: "oklch(0.48 0.04 40)",
  margin: 0,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  fontSize: 12,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "oklch(0.32 0.05 35)",
};

const input: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: 14,
  padding: "0.55rem 0.75rem",
  borderRadius: 10,
  border: "1px solid oklch(0.78 0.13 80 / 0.45)",
  background: "oklch(0.985 0.012 80)",
  color: "var(--espresso)",
  outline: "none",
  textTransform: "none",
  letterSpacing: "normal",
};

const primaryBtn: React.CSSProperties = {
  background: "linear-gradient(180deg, oklch(0.48 0.18 25), oklch(0.36 0.15 22))",
  color: "oklch(0.98 0.01 80)",
  border: "none",
  padding: "0.55rem 1.1rem",
  borderRadius: 999,
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.03em",
  cursor: "pointer",
  boxShadow: "0 8px 22px -10px oklch(0.42 0.16 25 / 0.6)",
};

const ghostBtn: React.CSSProperties = {
  background: "transparent",
  color: "var(--espresso)",
  border: "1px solid oklch(0.78 0.13 80 / 0.5)",
  padding: "0.45rem 0.95rem",
  borderRadius: 999,
  fontSize: 12,
  letterSpacing: "0.03em",
  cursor: "pointer",
};

const dangerBtn: React.CSSProperties = {
  background: "transparent",
  color: "oklch(0.55 0.18 25)",
  border: "1px solid oklch(0.55 0.18 25 / 0.5)",
  padding: "0.45rem 0.95rem",
  borderRadius: 999,
  fontSize: 12,
  letterSpacing: "0.03em",
  cursor: "pointer",
};

const errorBox: React.CSSProperties = {
  background: "oklch(0.97 0.05 25 / 0.4)",
  border: "1px solid oklch(0.55 0.18 25 / 0.4)",
  color: "oklch(0.36 0.15 22)",
  padding: "0.65rem 0.85rem",
  borderRadius: 10,
  fontSize: 13,
};
