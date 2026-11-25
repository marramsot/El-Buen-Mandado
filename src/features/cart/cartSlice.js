
import { createSlice } from "@reduxjs/toolkit";

// Estado inicial del carrito de compras.
const initialState = {
  items: [],
};

// Creamos el slice para administrar el carrito.
const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    // Agrega un producto o aumenta su cantidad si ya existe.
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
    },

    // Aumenta en una unidad la cantidad de un producto.
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    // Disminuye la cantidad sin permitir valores menores a uno.
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Elimina completamente un producto del carrito.
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // Vacía el carrito después de una compra o por decisión del usuario.
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Exportamos las acciones para utilizarlas en los componentes.
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

// Exportamos el reducer para configurarlo en store.js.
export default cartSlice.reducer;
