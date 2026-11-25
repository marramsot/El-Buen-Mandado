import { render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, it, expect, afterEach } from "vitest";

import OrderConfirmation from "./OrderConfirmation";
import cartReducer from "../features/cart/cartSlice.js";
import { theme } from "../styles/theme.js";

describe("OrderConfirmation", () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it("muestra los datos del pedido confirmado", () => {
    // Creamos un pedido de prueba.
    const order = {
      id: 12345,
      date: new Date().toISOString(),
      customer: {
        name: "Usuario",
        lastName: "de prueba",
        phone: "2221234567",
        street: "Calle de prueba",
        number: "10",
        neighborhood: "Centro",
        city: "Puebla",
        state: "Puebla",
        zipCode: "72000",
      },
      paymentMethod: "cash",
      items: [
        {
          id: 1,
          name: "Arroz Morelos",
          price: 32.5,
          quantity: 2,
        },
      ],
      total: 65,
    };

    sessionStorage.setItem(
      "elBuenMandadoOrder",
      JSON.stringify(order)
    );

    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <OrderConfirmation />
          </MemoryRouter>
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText("¡Pedido confirmado!")).toBeInTheDocument();
    expect(screen.getByText("Arroz Morelos × 2")).toBeInTheDocument();
    expect(screen.getByText("Efectivo contra entrega")).toBeInTheDocument();
    expect(screen.getAllByText("$65.00")).toHaveLength(2);
  });
});