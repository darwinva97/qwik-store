import { component$, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { useCart } from "~/lib/cart-context";
import styles from "./header.module.css";

export default component$(() => {
  const cart = useCart();
  const menuOpen = useSignal(false);

  return (
    <header class={styles.header}>
      <div class={styles.inner}>
        <Link href="/" class={styles.logo}>
          QwikStore
        </Link>

        <button
          class={styles.menuBtn}
          onClick$={() => (menuOpen.value = !menuOpen.value)}
          aria-label="Menú"
        >
          <span class={[styles.hamburger, menuOpen.value && styles.open]} />
        </button>

        <nav class={[styles.nav, menuOpen.value && styles.navOpen]}>
          <Link href="/" onClick$={() => (menuOpen.value = false)}>
            Inicio
          </Link>
          <Link href="/categoria/electronica" onClick$={() => (menuOpen.value = false)}>
            Electrónica
          </Link>
          <Link href="/categoria/ropa" onClick$={() => (menuOpen.value = false)}>
            Ropa
          </Link>
          <Link href="/categoria/hogar" onClick$={() => (menuOpen.value = false)}>
            Hogar
          </Link>
        </nav>

        <button class={styles.cartBtn} onClick$={() => cart.toggle()}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {cart.items.value.length > 0 && (
            <span class={styles.badge}>
              {cart.items.value.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </button>
      </div>
    </header>
  );
});
