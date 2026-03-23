import { component$, Slot } from "@builder.io/qwik";
import Header from "~/components/header/header";
import Footer from "~/components/footer/footer";
import CartDrawer from "~/components/cart-drawer/cart-drawer";
import { CartProvider } from "~/lib/cart-context";

export default component$(() => {
  return (
    <CartProvider>
      <Header />
      <main>
        <Slot />
      </main>
      <CartDrawer />
      <Footer />
    </CartProvider>
  );
});
