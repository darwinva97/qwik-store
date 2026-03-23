import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import ProductCard from "~/components/product-card/product-card";
import { getProducts, getCategories } from "~/lib/woo-api";
import type { WooProduct, WooCategory } from "~/lib/types";

export const useProducts = routeLoader$<WooProduct[]>(() => {
  return getProducts();
});

export const useCategories = routeLoader$<WooCategory[]>(() => {
  return getCategories();
});

export default component$(() => {
  const products = useProducts();
  const categories = useCategories();

  return (
    <>
      <section class="hero">
        <div class="container">
          <h1>Bienvenido a QwikStore</h1>
          <p>Los mejores productos al mejor precio, con la velocidad de Qwik.</p>
        </div>
      </section>

      <section class="container">
        <div class="categories-bar">
          {categories.value.map((cat) => (
            <a key={cat.id} href={`/categoria/${cat.slug}`} class="category-chip">
              {cat.name}
              <span class="category-count">{cat.count}</span>
            </a>
          ))}
        </div>
      </section>

      <section class="container">
        <h2 class="section-title">Productos destacados</h2>
        <div class="product-grid">
          {products.value.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: "QwikStore - Tienda Online",
  meta: [
    {
      name: "description",
      content: "Tienda online construida con Qwik y WooCommerce",
    },
  ],
};
