
import { createGlobalStyle } from "styled-components";

// Definimos los estilos globales de El Buen Mandado.
const GlobalStyles = createGlobalStyle`
  /* Configuración general de todos los elementos. */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Estilos generales de la página. */
  body {
    margin: 0;
    min-width: 320px;
    min-height: 100vh;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #F7F9F7;
    color: #263238;
    line-height: 1.5;
  }

  /* Los títulos no tendrán márgenes superiores. */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }

  /* Configuración de enlaces. */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Configuración general de botones. */
  button {
    font-family: inherit;
    cursor: pointer;
  }

  /* Configuración de campos de formulario. */
  input,
  select,
  textarea {
    font: inherit;
  }

  /* Las imágenes se adaptan a sus contenedores. */
  img {
    display: block;
    max-width: 100%;
  }

  /* Estilos para elementos deshabilitados. */
  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Mejoramos la navegación con teclado. */
  :focus-visible {
    outline: 3px solid #278C45;
    outline-offset: 3px;
  }

  /* Evitamos que el contenido desborde horizontalmente. */
  #root {
    min-height: 100vh;
    width: 100%;
  }

  /* Ajustes para dispositivos móviles. */
  @media (max-width: 480px) {
    body {
      font-size: 14px;
    }
  }
`;

export default GlobalStyles;
