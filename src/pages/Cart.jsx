
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice.js";

import {
  Container,
  CartLayout,
  CartItems,
  CartItem,
  ItemImage,
  ItemInfo,
  QuantityControls,
  RemoveButton,
  Summary,
  SummaryRow,
  Total,
  CheckoutButton,
  EmptyCart,
  BackLink,
} from "./Cart.styles.js";

// Página del carrito.
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    price.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container>
      <h1>Mi carrito</h1>

      {cartItems.length === 0 ? (
        <EmptyCart>
          <h2>Tu carrito está vacío</h2>
          <p>Agrega algunos productos para comenzar tu compra.</p>

          <BackLink>
            <Link to="/">Ver productos</Link>
          </BackLink>
        </EmptyCart>
      ) : (
        <CartLayout>
          <CartItems>
            {cartItems.map((item) => (
              <CartItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />

                <ItemInfo>
                  <h2>{item.name}</h2>
                  <p>{formatPrice(item.price)}</p>
                </ItemInfo>

                <QuantityControls>
                  <button
                    type="button"
                    aria-label={`Disminuir cantidad de ${item.name}`}
                    disabled={item.quantity <= 1}
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    aria-label={`Aumentar cantidad de ${item.name}`}
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>
                </QuantityControls>

                <RemoveButton
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Eliminar
                </RemoveButton>
              </CartItem>
            ))}
          </CartItems>

          <Summary>
            <h2>Resumen de compra</h2>

            <SummaryRow>
              <span>Productos</span>
              <span>{totalItems}</span>
            </SummaryRow>

            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </SummaryRow>

            <Total>
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </Total>

            <CheckoutButton
              type="button"
              onClick={handleCheckout}
            >
              Continuar con la compra
            </CheckoutButton>

            <BackLink>
              <Link to="/">Seguir comprando</Link>
            </BackLink>
          </Summary>
        </CartLayout>
      )}
    </Container>
  );
};

export default Cart;
