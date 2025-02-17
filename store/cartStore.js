"use client"; // Ensure it runs only on the client side

import { create } from "zustand";
import { useEffect } from "react";

const useCartStore = create((set) => {
  let initialCart = [];

  // Load from localStorage only on the client side
  if (typeof window !== "undefined") {
    const storedCart = localStorage.getItem("cart");
    initialCart = storedCart ? JSON.parse(storedCart) : [];
  }

  return {
    cartItems: initialCart,

    // Add item to the cart
    addItem: (item) =>
      set((state) => {
        const updatedCart = [...state.cartItems, item];
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync with localStorage
        }
        return { cartItems: updatedCart };
      }),

    // Remove item from the cart
    removeItem: (bookId) =>
      set((state) => {
        const updatedCart = state.cartItems.filter((item) => item.bookId !== bookId);
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync with localStorage
        }
        return { cartItems: updatedCart };
      }),

    // Update item quantity in the cart
    updateQuantity: (bookId, delta) =>
      set((state) => {
        const updatedCart = state.cartItems.map((item) =>
          item.bookId === bookId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        );
        if (typeof window !== "undefined") {
          localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync with localStorage
        }
        return { cartItems: updatedCart };
      }),

    // Clear cart
    clearCart: () =>
      set(() => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("cart"); // Clear from localStorage
        }
        return { cartItems: [] };
      }),
  };
});

// Sync localStorage on mount
export const useCartStoreSync = () => {
  const setCartItems = useCartStore((state) => state.setCartItems);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      setCartItems(storedCart ? JSON.parse(storedCart) : []);
    }
  }, [setCartItems]);
};

export default useCartStore;
