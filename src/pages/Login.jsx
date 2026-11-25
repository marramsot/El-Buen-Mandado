
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";

import {
  LoginContainer,
  LoginCard,
  LoginTitle,
  LoginDescription,
  LoginForm,
  FormGroup,
  FormLabel,
  FormInput,
  LoginButton,
  LoginFooter,
  ErrorMessage,
} from "./Login.styles.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const savedUser = localStorage.getItem("elBuenMandadoUser");

    if (!savedUser) {
      setError("No encontramos una cuenta registrada con esos datos.");
      return;
    }

    try {
      const registeredUser = JSON.parse(savedUser);

      if (
        registeredUser.email !== email.trim().toLowerCase() ||
        registeredUser.password !== password
      ) {
        setError("El correo electrónico o la contraseña son incorrectos.");
        return;
      }

      const loggedUser = {
        name: registeredUser.name,
        email: registeredUser.email,
      };

      dispatch(login(loggedUser));
      navigate("/", { replace: true });
    } catch {
      setError("No fue posible iniciar sesión. Inténtalo nuevamente.");
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>Iniciar sesión</LoginTitle>

        <LoginDescription>
          Ingresa a tu cuenta de El Buen Mandado.
        </LoginDescription>

        <LoginForm onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel htmlFor="email">Correo electrónico</FormLabel>
            <FormInput
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <FormInput
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </FormGroup>

          {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

          <LoginButton type="submit">
            Iniciar sesión
          </LoginButton>
        </LoginForm>

        <LoginFooter>
          ¿Todavía no tienes una cuenta?{" "}
          <Link to="/registro">Regístrate aquí</Link>
        </LoginFooter>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
