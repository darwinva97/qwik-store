import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./footer.module.css";

export default component$(() => {
  return (
    <footer class={styles.footer}>
      <div class={styles.inner}>
        <div class={styles.brand}>
          <span class={styles.logo}>QwikStore</span>
          <p>Tu tienda online con la mejor experiencia.</p>
        </div>
        <div class={styles.links}>
          <h4>Categorías</h4>
          <Link href="/categoria/electronica">Electrónica</Link>
          <Link href="/categoria/ropa">Ropa</Link>
          <Link href="/categoria/hogar">Hogar</Link>
        </div>
        <div class={styles.links}>
          <h4>Ayuda</h4>
          <a href="#">Contacto</a>
          <a href="#">Envíos</a>
          <a href="#">Devoluciones</a>
        </div>
      </div>
      <div class={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} QwikStore. Hecho con Qwik + WooCommerce.</p>
      </div>
    </footer>
  );
});
