
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  HeaderContainer,
  HeaderContent,
  Logo,
  Navigation,
  NavLink,
  CartCount,
} from "./Header.styles.js";

// Encabezado de la tienda.
const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  // Contamos todos los productos del carrito.
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Link to="/">El Buen Mandado</Link>
        </Logo>

        <Navigation aria-label="Navegación principal">
          <NavLink as={Link} to="/">
            Inicio
          </NavLink>

          {user ? (
            <NavLink as={Link} to="/cuenta">
              Mi cuenta
            </NavLink>
          ) : (
            <NavLink as={Link} to="/login">
              Iniciar sesión
            </NavLink>
          )}

          <NavLink as={Link} to="/carrito">
            Carrito
            <CartCount>{cartCount}</CartCount>
          </NavLink>
        </Navigation>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
