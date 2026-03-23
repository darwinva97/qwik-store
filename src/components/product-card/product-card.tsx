import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import type { WooProduct } from "~/lib/types";
import { useCart } from "~/lib/cart-context";
import styles from "./product-card.module.css";

interface Props {
  product: WooProduct;
}

export default component$<Props>(({ product }) => {
  const cart = useCart();
  const image = product.images[0];

  return (
    <article class={styles.card}>
      <Link href={`/producto/${product.slug}`} class={styles.imageLink}>
        {image && (
          <img
            src={image.src}
            alt={image.alt || product.name}
            width={400}
            height={400}
            loading="lazy"
          />
        )}
        {product.on_sale && <span class={styles.saleBadge}>Oferta</span>}
      </Link>

      <div class={styles.info}>
        <span class={styles.category}>
          {product.categories[0]?.name}
        </span>
        <Link href={`/producto/${product.slug}`} class={styles.name}>
          {product.name}
        </Link>
        <p class={styles.desc} dangerouslySetInnerHTML={product.short_description} />

        <div class={styles.priceRow}>
          <div class={styles.prices}>
            <span class={styles.price}>${product.price}</span>
            {product.on_sale && product.regular_price && (
              <span class={styles.regularPrice}>${product.regular_price}</span>
            )}
          </div>
          <button
            class={styles.addBtn}
            onClick$={() => cart.add(product)}
            disabled={product.stock_status !== "instock"}
          >
            {product.stock_status === "instock" ? "Agregar" : "Agotado"}
          </button>
        </div>
      </div>
    </article>
  );
});
