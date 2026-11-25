
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme.js";
import Home from "./Home.jsx";

// Simulamos el dispatch de Redux.
vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
}));

const renderHome = () => {
  useDispatch.mockReturnValue(vi.fn());

  return render(
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
};

describe("Home", () => {
  // Verificamos que se muestre el catálogo.
  test("muestra los productos de la tienda", () => {
    renderHome();

    expect(
      screen.getByText("Bienvenido a El Buen Mandado")
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("button", {
        name: "Agregar al carrito",
      })
    ).toHaveLength(24);
  });

  // Verificamos la búsqueda de productos.
  test("busca productos por nombre", () => {
    renderHome();

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "arroz" },
    });

    expect(screen.getByText("Arroz Morelos")).toBeInTheDocument();
    expect(screen.queryByText("Leche entera")).not.toBeInTheDocument();
  });

  // Verificamos el filtro por categoría.
  test("filtra los productos por categoría", () => {
    renderHome();

    fireEvent.click(
      screen.getByRole("button", { name: "Lácteos" })
    );

    expect(screen.getByText("Leche entera")).toBeInTheDocument();
    expect(screen.queryByText("Arroz Morelos")).not.toBeInTheDocument();
  });
});
