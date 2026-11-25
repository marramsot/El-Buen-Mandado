
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import App from "./App.jsx";
import { store } from "./app/store.js";
import GlobalStyles from "./styles/GlobalStyles.js";
import { theme } from "./styles/theme.js";

// Renderizamos la aplicación principal.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Conectamos Redux con toda la aplicación. */}
    <Provider store={store}>
      {/* Habilitamos la navegación entre páginas. */}
      <BrowserRouter>
        {/* Compartimos los colores y breakpoints. */}
        <ThemeProvider theme={theme}>
          {/* Aplicamos los estilos globales. */}
          <GlobalStyles />

          {/* Mostramos nuestra tienda. */}
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
