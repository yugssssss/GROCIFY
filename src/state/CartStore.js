



import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { mmkvStorage } from './Storage';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (item) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (cartItem) => cartItem._id === item._id
        );

        // If item already exists in the cart
        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            count: updatedCart[existingItemIndex].count + 1,
          };

          set({ cart: updatedCart });
        } else {
          // If item is new to the cart
          set({
            cart: [
              ...currentCart,
              { _id: item._id, item: item, count: 1 }
            ],
          });
        }
      },
      clearCart: () => set({ cart: [] }),

      removeItem: (id) => {
        const currentCart = get().cart;
        const existingItemIndex = currentCart.findIndex(
          (cartItem) => cartItem?._id === id
        );

        if (existingItemIndex >= 0) {
          const updatedCart = [...currentCart];
          const existingItem = updatedCart[existingItemIndex];

          if (existingItem.count > 1) {
            updatedCart[existingItemIndex] = {
              ...existingItem,
              count: existingItem?.count - 1,
            };
          } else {
            updatedCart.splice(existingItemIndex, 1);
          }

          set({ cart: updatedCart });
        }
      },
      getItemCount: (id) => {
        const currentItem = get().cart.find((cartItem) => cartItem._id === id);
        return currentItem ? currentItem?.count : 0;
      },
      
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, cartItem) => total + cartItem.item.price * cartItem.count,
          0
        );
      },

    }),
    {
      name: 'cart-storage',
      storage:createJSONStorage(()=>mmkvStorage),
       
    }
  )
);
