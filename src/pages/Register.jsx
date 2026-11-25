
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  RegisterContainer,
  RegisterCard,
  RegisterTitle,
  RegisterDescription,
  RegisterForm,
  FormGroup,
  FormLabel,
  FormInput,
  RegisterButton,
  RegisterFooter,
  ErrorMessage,
} from "./Register.styles.js";

const Register = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) {
      setError("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const savedUser = localStorage.getItem("elBuenMandadoUser");

      if (savedUser) {
        const registeredUser = JSON.parse(savedUser);

        if (registeredUser.email === normalizedEmail) {
          setError("Ya existe una cuenta registrada con ese correo.");
          return;
        }
      }

      const newUser = {
        name: normalizedName,
        email: normalizedEmail,
        password,
      };

      localStorage.setItem(
        "elBuenMandadoUser",
        JSON.stringify(newUser)
      );

      navigate("/login", { replace: true });
    } catch {
      setError("No fue posible completar el registro. Inténtalo nuevamente.");
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterTitle>Crear cuenta</RegisterTitle>

        <RegisterDescription>
          Regístrate para comprar en El Buen Mandado.
        </RegisterDescription>

        <RegisterForm onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="name">Nombre completo</FormLabel>
            <FormInput
              id="name"
              type="text"
              placeholder="Ingresa tu nombre completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="register-email">
              Correo electrónico
            </FormLabel>
            <FormInput
              id="register-email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="register-password">
              Contraseña
            </FormLabel>
            <FormInput
              id="register-password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="confirm-password">
              Confirmar contraseña
            </FormLabel>
            <FormInput
              id="confirm-password"
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
            />
          </FormGroup>

          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

          <RegisterButton type="submit">
            Crear cuenta
          </RegisterButton>
        </RegisterForm>

        <RegisterFooter>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">Inicia sesión aquí</Link>
        </RegisterFooter>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register;
