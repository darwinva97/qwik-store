import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { getProduct } from "~/lib/woo-api";
import { useCart } from "~/lib/cart-context";
import type { WooProduct } from "~/lib/types";

export const useProduct = routeLoader$<WooProduct | null>(({ params }) => {
  return getProduct(params.slug);
});

export default component$(() => {
  const product = useProduct();
  const cart = useCart();
  const qty = useSignal(1);

  if (!product.value) {
    return (
      <div class="container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h1>Producto no encontrado</h1>
        <a href="/">Volver al inicio</a>
      </div>
    );
  }

  const p = product.value;

  return (
    <section class="container product-detail">
      <div class="product-detail-grid">
        <div class="product-gallery">
          {p.images[0] && (
            <img
              src={p.images[0].src}
              alt={p.images[0].alt || p.name}
              width={600}
              height={600}
            />
          )}
        </div>

        <div class="product-info">
          <nav class="breadcrumb">
            <a href="/">Inicio</a> /
            {p.categories[0] && (
              <>
                <a href={`/categoria/${p.categories[0].slug}`}>{p.categories[0].name}</a> /
              </>
            )}
            <span>{p.name}</span>
          </nav>

          <h1>{p.name}</h1>

          <div class="product-rating">
            {"★".repeat(Math.round(parseFloat(p.average_rating)))}
            {"☆".repeat(5 - Math.round(parseFloat(p.average_rating)))}
            <span>({p.rating_count} reseñas)</span>
          </div>

          <div class="product-price-detail">
            <span class="price-big">${p.price}</span>
            {p.on_sale && p.regular_price && (
              <span class="price-old">${p.regular_price}</span>
            )}
            {p.on_sale && (
              <span class="discount-badge">
                -{Math.round((1 - parseFloat(p.price) / parseFloat(p.regular_price)) * 100)}%
              </span>
            )}
          </div>

          <div
            class="product-description"
            dangerouslySetInnerHTML={p.description}
          />

          {p.attributes.length > 0 && (
            <div class="product-attributes">
              {p.attributes.map((attr) => (
                <div key={attr.id} class="attribute-group">
                  <label>{attr.name}</label>
                  <div class="attribute-options">
                    {attr.options.map((opt) => (
                      <button key={opt} class="attribute-option">
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div class="add-to-cart-row">
            <div class="qty-selector">
              <button onClick$={() => (qty.value = Math.max(1, qty.value - 1))}>-</button>
              <span>{qty.value}</span>
              <button onClick$={() => (qty.value = qty.value + 1)}>+</button>
            </div>
            <button
              class="add-to-cart-btn"
              onClick$={() => cart.add(p, qty.value)}
              disabled={p.stock_status !== "instock"}
            >
              {p.stock_status === "instock" ? "Agregar al carrito" : "Agotado"}
            </button>
          </div>

          <p class="sku">SKU: {p.sku}</p>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const product = resolveValue(useProduct);
  return {
    title: product ? `${product.name} - QwikStore` : "Producto no encontrado",
    meta: [
      {
        name: "description",
        content: product?.short_description ?? "",
      },
    ],
  };
};
