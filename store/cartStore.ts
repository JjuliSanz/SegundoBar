import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number; // Precio unitario
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  isCartOpen: boolean; // Estado del carrito
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
}

export const calculateTotalPrice = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

export const calculateIndividualPrice = (
  price: number,
  quantity: number
): number => {
  return price * quantity;
};

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set) => ({
      cart: [],
      isCartOpen: false,
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1,
                    }
                  : cartItem
              ),
              isCartOpen: true, // Abrir el carrito
            };
          }
          return {
            cart: [...state.cart, { ...item, quantity: 1 }],
            isCartOpen: true, // Abrir el carrito
          };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      decreaseQuantity: (id) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === id
          );
          if (existingItem && existingItem.quantity > 1) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity - 1,
                    }
                  : cartItem
              ),
            };
          } else {
            return {
              cart: state.cart.filter((cartItem) => cartItem.id !== id),
            };
          }
        }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
    }),
    {
      name: "cart-storage", // Nombre para identificar en el localStorage
      storage: createJSONStorage(() => localStorage), // Definir el uso de localStorage
    }
  )
);
