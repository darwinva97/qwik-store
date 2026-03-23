import {
  component$,
  createContextId,
  type Signal,
  Slot,
  useContextProvider,
  useSignal,
  useContext,
  $,
  type QRL,
} from "@builder.io/qwik";
import type { CartItem, WooProduct } from "./types";

export interface CartStore {
  items: Signal<CartItem[]>;
  isOpen: Signal<boolean>;
  add: QRL<(product: WooProduct, qty?: number) => void>;
  remove: QRL<(productId: number) => void>;
  updateQty: QRL<(productId: number, qty: number) => void>;
  clear: QRL<() => void>;
  toggle: QRL<() => void>;
  total: QRL<() => number>;
  count: QRL<() => number>;
}

export const CartContext = createContextId<CartStore>("cart");

export const CartProvider = component$(() => {
  const items = useSignal<CartItem[]>([]);
  const isOpen = useSignal(false);

  const add = $((product: WooProduct, qty = 1) => {
    const existing = items.value.find((i) => i.product.id === product.id);
    if (existing) {
      items.value = items.value.map((i) =>
        i.product.id === product.id
          ? { ...i, quantity: i.quantity + qty }
          : i,
      );
    } else {
      items.value = [...items.value, { product, quantity: qty }];
    }
    isOpen.value = true;
  });

  const remove = $((productId: number) => {
    items.value = items.value.filter((i) => i.product.id !== productId);
  });

  const updateQty = $((productId: number, qty: number) => {
    if (qty <= 0) {
      items.value = items.value.filter((i) => i.product.id !== productId);
    } else {
      items.value = items.value.map((i) =>
        i.product.id === productId ? { ...i, quantity: qty } : i,
      );
    }
  });

  const clear = $(() => {
    items.value = [];
  });

  const toggle = $(() => {
    isOpen.value = !isOpen.value;
  });

  const total = $(() => {
    return items.value.reduce(
      (sum, i) => sum + parseFloat(i.product.price || "0") * i.quantity,
      0,
    );
  });

  const count = $(() => {
    return items.value.reduce((sum, i) => sum + i.quantity, 0);
  });

  const store: CartStore = {
    items,
    isOpen,
    add,
    remove,
    updateQty,
    clear,
    toggle,
    total,
    count,
  };

  useContextProvider(CartContext, store);

  return <Slot />;
});

export function useCart() {
  return useContext(CartContext);
}
