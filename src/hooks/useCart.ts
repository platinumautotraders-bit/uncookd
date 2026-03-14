"use client";

import { useCartStore } from "@/stores/cartStore";

export function useCart() {
  const store = useCartStore();

  return {
    items: store.items,
    addItem: store.addItem,
    removeItem: store.removeItem,
    updateQuantity: store.updateQuantity,
    clearCart: store.clearCart,
    subtotal: store.getSubtotal(),
    deliveryFee: store.getDeliveryFee(),
    total: store.getTotal(),
    itemCount: store.getItemCount(),
    isEmpty: store.items.length === 0,
  };
}
