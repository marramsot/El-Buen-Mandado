
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme.js";
import Register from "./Register.jsx";

// Simulamos un usuario sin sesión iniciada.
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

const renderRegister = () => {
  useSelector.mockReturnValue(null);

  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={["/registro"]}>
        <Routes>
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<h1>Iniciar sesión</h1>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
};

// Completamos el formulario.
const submitRegister = (confirmPassword) => {
  fireEvent.change(screen.getByLabelText("Nombre completo"), {
    target: { value: "Usuario de prueba" },
  });

  fireEvent.change(screen.getByLabelText("Correo electrónico"), {
    target: { value: "usuario@correo.com" },
  });

  fireEvent.change(screen.getByLabelText("Contraseña", { exact: true }), {
    target: { value: "prueba123" },
  });

  fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
    target: { value: confirmPassword },
  });

  fireEvent.click(
    screen.getByRole("button", { name: "Crear cuenta" })
  );
};

describe("Register", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // Verificamos el registro de un usuario.
  test("registra correctamente un usuario", () => {
    renderRegister();

    submitRegister("prueba123");

    const user = JSON.parse(
      localStorage.getItem("elBuenMandadoUser")
    );

    expect(user.email).toBe("usuario@correo.com");
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  // Verificamos que las contraseñas coincidan.
  test("muestra un error cuando las contraseñas no coinciden", () => {
    renderRegister();

    submitRegister("diferente123");

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Las contraseñas no coinciden."
    );

    expect(localStorage.getItem("elBuenMandadoUser")).toBeNull();
  });
});
