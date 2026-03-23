import { component$, useSignal } from "@builder.io/qwik";
import { routeAction$, type DocumentHead } from "@builder.io/qwik-city";
import { useCart } from "~/lib/cart-context";
import { createOrder } from "~/lib/woo-api";

export const useCreateOrder = routeAction$(async (formData) => {
  try {
    const billing = {
      first_name: formData.first_name as string,
      last_name: formData.last_name as string,
      email: formData.email as string,
      phone: (formData.phone as string) || "",
      address_1: formData.address_1 as string,
      city: formData.city as string,
      state: formData.state as string,
      postcode: formData.postcode as string,
      country: formData.country as string,
    };

    const lineItems = JSON.parse(formData.line_items as string);

    const order = await createOrder({
      billing,
      shipping: billing,
      line_items: lineItems,
    });

    return { success: true, orderId: order.id };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Error al crear el pedido";
    return { success: false, error: message };
  }
});

export default component$(() => {
  const cart = useCart();
  const orderAction = useCreateOrder();
  const submitted = useSignal(false);
  const orderId = useSignal<number | null>(null);

  const total = cart.items.value.reduce(
    (s, i) => s + parseFloat(i.product.price || "0") * i.quantity,
    0,
  );

  if (cart.items.value.length === 0 && !submitted.value) {
    return (
      <section class="container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h1>Tu carrito está vacío</h1>
        <a href="/" class="add-to-cart-btn" style={{ display: "inline-block", marginTop: "1rem", textDecoration: "none" }}>
          Ir a la tienda
        </a>
      </section>
    );
  }

  if (submitted.value) {
    return (
      <section class="container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h1>Pedido recibido</h1>
        <p style={{ color: "#666", maxWidth: "500px", margin: "1rem auto" }}>
          Gracias por tu compra.
          {orderId.value && <> Tu número de pedido es <strong>#{orderId.value}</strong>.</>}
        </p>
        <a href="/" class="add-to-cart-btn" style={{ display: "inline-block", marginTop: "1rem", textDecoration: "none" }}>
          Volver a la tienda
        </a>
      </section>
    );
  }

  return (
    <section class="container checkout-page">
      <h1 class="section-title">Finalizar compra</h1>

      <div class="checkout-grid">
        <form
          class="checkout-form"
          preventdefault:submit
          onSubmit$={async (_, target) => {
            const formData = new FormData(target as HTMLFormElement);
            const lineItems = cart.items.value.map((item) => ({
              product_id: item.product.id,
              quantity: item.quantity,
            }));
            formData.set("line_items", JSON.stringify(lineItems));

            await orderAction.submit(Object.fromEntries(formData));

            if (orderAction.value?.success) {
              orderId.value = orderAction.value.orderId ?? null;
              cart.clear();
              submitted.value = true;
            }
          }}
        >
          {orderAction.value && !orderAction.value.success && (
            <p style={{ color: "#e53e3e", marginBottom: "1rem" }}>
              {orderAction.value.error}
            </p>
          )}
          <h2>Datos de envío</h2>
          <div class="form-row">
            <div class="form-group">
              <label>Nombre</label>
              <input type="text" name="first_name" required />
            </div>
            <div class="form-group">
              <label>Apellido</label>
              <input type="text" name="last_name" required />
            </div>
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div class="form-group">
            <label>Teléfono</label>
            <input type="tel" name="phone" />
          </div>
          <div class="form-group">
            <label>Dirección</label>
            <input type="text" name="address_1" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Ciudad</label>
              <input type="text" name="city" required />
            </div>
            <div class="form-group">
              <label>Estado/Provincia</label>
              <input type="text" name="state" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Código postal</label>
              <input type="text" name="postcode" required />
            </div>
            <div class="form-group">
              <label>País</label>
              <input type="text" name="country" value="MX" required />
            </div>
          </div>

          <button type="submit" class="add-to-cart-btn" style={{ width: "100%", marginTop: "1rem" }}>
            Confirmar pedido - ${total.toFixed(2)}
          </button>
        </form>

        <aside class="checkout-summary">
          <h2>Resumen</h2>
          <ul class="checkout-items">
            {cart.items.value.map((item) => (
              <li key={item.product.id}>
                <img src={item.product.images[0]?.src} alt={item.product.name} width={48} height={48} />
                <div>
                  <span class="checkout-item-name">{item.product.name}</span>
                  <span class="checkout-item-qty">x{item.quantity} - ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
          <div class="checkout-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Checkout - QwikStore",
};
