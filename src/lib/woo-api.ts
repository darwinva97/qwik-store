import type { WooProduct, WooCategory, WooOrder } from "./types";

const WOO_URL = import.meta.env.VITE_WOO_URL ?? "";
const WOO_KEY = import.meta.env.VITE_WOO_CONSUMER_KEY ?? "";
const WOO_SECRET = import.meta.env.VITE_WOO_CONSUMER_SECRET ?? "";

function apiUrl(endpoint: string, params: Record<string, string | number> = {}) {
  const url = new URL(`${WOO_URL}/wp-json/wc/v3/${endpoint}`);
  url.searchParams.set("consumer_key", WOO_KEY);
  url.searchParams.set("consumer_secret", WOO_SECRET);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }
  return url.toString();
}

async function fetchWoo<T>(
  endpoint: string,
  params: Record<string, string | number> = {},
  method: "GET" | "POST" = "GET",
  body?: unknown,
): Promise<T> {
  const url = apiUrl(endpoint, method === "GET" ? params : {});
  const init: RequestInit = { method };
  if (body) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body);
    // For POST, add auth as query params too
    const postUrl = new URL(url);
    postUrl.searchParams.set("consumer_key", WOO_KEY);
    postUrl.searchParams.set("consumer_secret", WOO_SECRET);
    const res = await fetch(postUrl.toString(), init);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`WooCommerce API error ${res.status}: ${text}`);
    }
    return res.json();
  }
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WooCommerce API error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function getProducts(
  params: Record<string, string | number> = {},
): Promise<WooProduct[]> {
  return fetchWoo<WooProduct[]>("products", { per_page: 20, ...params });
}

export async function getProduct(slug: string): Promise<WooProduct | null> {
  const products = await fetchWoo<WooProduct[]>("products", { slug });
  return products[0] ?? null;
}

export async function getProductById(id: number): Promise<WooProduct> {
  return fetchWoo<WooProduct>(`products/${id}`);
}

export async function getCategories(): Promise<WooCategory[]> {
  return fetchWoo<WooCategory[]>("products/categories", {
    per_page: 100,
    hide_empty: 1,
  });
}

export async function getCategoryBySlug(
  slug: string,
): Promise<WooCategory | null> {
  const cats = await fetchWoo<WooCategory[]>("products/categories", { slug });
  return cats[0] ?? null;
}

export async function getProductsByCategory(
  categoryId: number,
): Promise<WooProduct[]> {
  return fetchWoo<WooProduct[]>("products", {
    category: categoryId,
    per_page: 20,
  });
}

export async function searchProducts(query: string): Promise<WooProduct[]> {
  return fetchWoo<WooProduct[]>("products", { search: query, per_page: 20 });
}

export async function createOrder(
  orderData: Partial<WooOrder>,
): Promise<WooOrder> {
  return fetchWoo<WooOrder>("orders", {}, "POST", orderData);
}
