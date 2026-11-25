
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "../styles/theme.js";
import authReducer from "../features/auth/authSlice.js";
import Login from "./Login.jsx";

// Usuario de prueba.
const registeredUser = {
  name: "Usuario de prueba",
  email: "usuario@correo.com",
  password: "prueba123",
};

const renderLogin = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        isAuthenticated: false,
      },
    },
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<h1>Inicio</h1>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  return store;
};

// Completamos el formulario.
const submitLogin = (email, password) => {
  fireEvent.change(screen.getByLabelText("Correo electrónico"), {
    target: { value: email },
  });

  fireEvent.change(screen.getByLabelText("Contraseña"), {
    target: { value: password },
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Iniciar sesión" })
  );
};

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
      "elBuenMandadoUser",
      JSON.stringify(registeredUser)
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  // Verificamos el inicio de sesión.
  test("inicia sesión con credenciales correctas", () => {
    const store = renderLogin();

    submitLogin(registeredUser.email, registeredUser.password);

    expect(store.getState().auth.isAuthenticated).toBe(true);
    expect(screen.getByText("Inicio")).toBeInTheDocument();
  });

  // Verificamos las credenciales incorrectas.
  test("muestra un error cuando la contraseña es incorrecta", () => {
    const store = renderLogin();

    submitLogin(registeredUser.email, "incorrecta");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "El correo electrónico o la contraseña son incorrectos."
    );

    expect(store.getState().auth.isAuthenticated).toBe(false);
  });
});
