import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import ProductCard from "~/components/product-card/product-card";
import {
  getCategoryBySlug,
  getProductsByCategory,
} from "~/lib/woo-api";
import type { WooProduct, WooCategory } from "~/lib/types";

export const useCategory = routeLoader$<WooCategory | null>(({ params }) => {
  return getCategoryBySlug(params.slug);
});

export const useCategoryProducts = routeLoader$<WooProduct[]>(
  async ({ params }) => {
    const category = await getCategoryBySlug(params.slug);
    if (!category) return [];
    return getProductsByCategory(category.id);
  },
);

export default component$(() => {
  const products = useCategoryProducts();
  const category = useCategory();

  return (
    <section class="container">
      <nav class="breadcrumb" style={{ marginTop: "2rem" }}>
        <a href="/">Inicio</a> / <span>{category.value?.name ?? "Categoría"}</span>
      </nav>

      <h1 class="section-title">{category.value?.name ?? "Categoría"}</h1>

      {products.value.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", padding: "3rem 0" }}>
          No hay productos en esta categoría.
        </p>
      ) : (
        <div class="product-grid">
          {products.value.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const category = resolveValue(useCategory);
  return {
    title: category ? `${category.name} - QwikStore` : "Categoría - QwikStore",
  };
};
