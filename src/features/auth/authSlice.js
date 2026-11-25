
import { createSlice } from "@reduxjs/toolkit";

// Recuperamos la sesión guardada en el navegador.
const getSavedUser = () => {
  try {
    const savedUser = localStorage.getItem("elBuenMandadoSession");

    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    return null;
  }
};

// Estado inicial de autenticación.
const initialState = {
  user: getSavedUser(),
  isAuthenticated: Boolean(getSavedUser()),
};

// Creamos el slice para administrar la sesión.
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    // Inicia sesión con los datos del usuario.
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Guardamos la sesión para conservarla al recargar.
      localStorage.setItem(
        "elBuenMandadoSession",
        JSON.stringify(action.payload)
      );
    },

    // Cierra la sesión del usuario.
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Eliminamos solamente la sesión.
      localStorage.removeItem("elBuenMandadoSession");
    },
  },
});

// Exportamos las acciones de autenticación.
export const { login, logout } = authSlice.actions;

// Exportamos el reducer para configurarlo en Redux.
export default authSlice.reducer;
