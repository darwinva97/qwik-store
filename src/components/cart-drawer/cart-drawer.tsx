import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useCart } from "~/lib/cart-context";
import styles from "./cart-drawer.module.css";

export default component$(() => {
  const cart = useCart();
  const total = useSignal(0);

  useTask$(({ track }) => {
    track(() => cart.items.value);
    total.value = cart.items.value.reduce(
      (s, i) => s + parseFloat(i.product.price || "0") * i.quantity,
      0,
    );
  });

  return (
    <>
      {cart.isOpen.value && (
        <div class={styles.overlay} onClick$={() => cart.toggle()} />
      )}
      <aside class={[styles.drawer, cart.isOpen.value && styles.open]}>
        <div class={styles.header}>
          <h2>Carrito</h2>
          <button class={styles.closeBtn} onClick$={() => cart.toggle()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {cart.items.value.length === 0 ? (
          <div class={styles.empty}>
            <p>Tu carrito está vacío</p>
            <button class={styles.continueBtn} onClick$={() => cart.toggle()}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <>
            <ul class={styles.items}>
              {cart.items.value.map((item) => (
                <li key={item.product.id} class={styles.item}>
                  <img
                    src={item.product.images[0]?.src}
                    alt={item.product.name}
                    width={64}
                    height={64}
                  />
                  <div class={styles.itemInfo}>
                    <span class={styles.itemName}>{item.product.name}</span>
                    <span class={styles.itemPrice}>${item.product.price}</span>
                    <div class={styles.qtyControls}>
                      <button onClick$={() => cart.updateQty(item.product.id, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick$={() => cart.updateQty(item.product.id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    class={styles.removeBtn}
                    onClick$={() => cart.remove(item.product.id)}
                    aria-label="Eliminar"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>

            <div class={styles.footer}>
              <div class={styles.totalRow}>
                <span>Total</span>
                <span class={styles.totalPrice}>${total.value.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                class={styles.checkoutBtn}
                onClick$={() => cart.toggle()}
              >
                Finalizar compra
              </Link>
              <button class={styles.clearBtn} onClick$={() => cart.clear()}>
                Vaciar carrito
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
});
