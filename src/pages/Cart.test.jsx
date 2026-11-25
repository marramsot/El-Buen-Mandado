
import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "../styles/theme.js";
import cartReducer from "../features/cart/cartSlice.js";
import Cart from "./Cart.jsx";

// Producto de prueba.
const product = {
  id: 1,
  name: "Arroz Morelos",
  price: 32.5,
  image: "/images/arroz.jpg",
  quantity: 2,
};

// Configuramos Redux para las pruebas.
const renderCart = (items = []) => {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: { items },
    },
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

  return store;
};

describe("Cart", () => {
  // Verificamos el producto y el total.
  test("muestra el producto y el total de la compra", () => {
    renderCart([product]);

    expect(screen.getByText("Arroz Morelos")).toBeInTheDocument();
    expect(screen.getAllByText("$65.00")).toHaveLength(2);
  });

  // Verificamos los cambios de cantidad.
  test("aumenta y disminuye la cantidad del producto", () => {
    const store = renderCart([product]);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Aumentar cantidad de Arroz Morelos",
      })
    );

    expect(store.getState().cart.items[0].quantity).toBe(3);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Disminuir cantidad de Arroz Morelos",
      })
    );

    expect(store.getState().cart.items[0].quantity).toBe(2);
  });

  // Verificamos la eliminación del producto.
  test("elimina un producto del carrito", () => {
    const store = renderCart([product]);

    fireEvent.click(
      screen.getByRole("button", { name: "Eliminar" })
    );

    expect(store.getState().cart.items).toHaveLength(0);
  });

  // Verificamos el carrito vacío.
  test("muestra un mensaje cuando el carrito está vacío", () => {
    renderCart();

    expect(
      screen.getByText("Tu carrito está vacío")
    ).toBeInTheDocument();
  });
});
