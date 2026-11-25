import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, it, expect } from "vitest";

import Account from "./Account";
import authReducer from "../features/auth/authSlice.js";
import { theme } from "../styles/theme.js";

describe("Account", () => {
  it("muestra los datos del usuario", () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          user: {
            name: "Usuario de prueba",
            email: "usuario@correo.com",
          },
          isAuthenticated: true,
        },
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <Account />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText("Mi cuenta")).toBeInTheDocument();
    expect(screen.getByText("Usuario de prueba")).toBeInTheDocument();
    expect(screen.getByText("usuario@correo.com")).toBeInTheDocument();
  });
});