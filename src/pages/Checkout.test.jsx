import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, it, expect } from "vitest";

import Checkout from "./Checkout";
import cartReducer from "../features/cart/cartSlice.js";
import { theme } from "../styles/theme.js";

// Preparamos el carrito con un producto de prueba.
const renderCheckout = () => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [
          {
            id: 1,
            name: "Arroz Morelos",
            price: 32.5,
            quantity: 2,
          },
        ],
      },
    },
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Checkout />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe("Checkout", () => {
  it("muestra el resumen y el total del pedido", () => {
    renderCheckout();

    expect(screen.getByText("Resumen del pedido")).toBeInTheDocument();
    expect(screen.getByText("Arroz Morelos × 2")).toBeInTheDocument();
    expect(screen.getAllByText("$65.00")).toHaveLength(2);
  });

  it("permite guardar el método de pago", () => {
    renderCheckout();

    fireEvent.click(screen.getByLabelText("Tarjeta bancaria"));

    fireEvent.click(
      screen.getByRole("button", {
        name: "Guardar método de pago",
      })
    );

    expect(
      screen.getByText("Método de pago guardado correctamente.")
    ).toBeInTheDocument();
  });
});