
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme.js";
import { addToCart } from "../../features/cart/cartSlice.js";
import ProductCard from "./ProductCard.jsx";

// Simulamos el dispatch de Redux.
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

// Producto de prueba.
const product = {
  id: 1,
  name: "Arroz Morelos",
  description: "Arroz blanco de grano largo.",
  presentation: "Bolsa de 1 kg",
  price: 32.5,
  image: "/images/arroz.jpg",
  category: "Abarrotes",
};

const renderProductCard = () => {
  return render(
    <ThemeProvider theme={theme}>
      <ProductCard product={product} />
    </ThemeProvider>
  );
};

describe("ProductCard", () => {
  // Verificamos los datos del producto.
  test("muestra la información del producto", () => {
    useDispatch.mockReturnValue(vi.fn());

    renderProductCard();

    expect(screen.getByText("Arroz Morelos")).toBeInTheDocument();
    expect(screen.getByText("$32.50")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Arroz Morelos" })
    ).toBeInTheDocument();
  });

  // Verificamos que se agregue al carrito.
  test("agrega el producto al carrito", () => {
    const dispatch = vi.fn();

    useDispatch.mockReturnValue(dispatch);

    renderProductCard();

    fireEvent.click(
      screen.getByRole("button", { name: "Agregar al carrito" })
    );

    expect(dispatch).toHaveBeenCalledWith(addToCart(product));
  });
});
