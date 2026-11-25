
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "../features/cart/cartSlice.js";
import authReducer from "../features/auth/authSlice.js";

// Configuramos el almacén global de Redux.
export const store = configureStore({
  reducer: {
    // Administra los productos del carrito.
    cart: cartReducer,

    // Administra la sesión del usuario.
    auth: authReducer,
  },
});
