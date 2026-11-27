
import { Link, Navigate } from "react-router-dom";

import {
  Container,
  ConfirmationCard,
  ConfirmationHeader,
  SuccessIcon,
  OrderSection,
  OrderRow,
  OrderTotal,
  BackButton,
} from "./OrderConfirmation.styles.js";

// Recuperamos el último pedido.
const getSavedOrder = () => {
  try {
    const savedOrder = sessionStorage.getItem("elBuenMandadoOrder");
    return savedOrder ? JSON.parse(savedOrder) : null;
  } catch {
    return null;
  }
};

const formatPrice = (price) =>
  price.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

const OrderConfirmation = () => {

  const order = getSavedOrder();

  if (!order) {
    return <Navigate to="/" replace />;
  }

  const { customer, paymentMethod, items, total } = order;

  const paymentText =
    paymentMethod === "cash"
      ? "Efectivo contra entrega"
      : "Tarjeta bancaria";

  return (
    <Container>
      <ConfirmationCard>
        <ConfirmationHeader>
          <SuccessIcon aria-hidden="true">✓</SuccessIcon>
          <h1>¡Pedido confirmado!</h1>
          <p>Gracias por comprar en El Buen Mandado.</p>
          <p>Tu pedido se registró correctamente.</p>
        </ConfirmationHeader>

        <OrderSection>
          <h2>Información del pedido</h2>
          <p>
            <strong>Número de pedido:</strong> {order.id}
          </p>
          <p>
            <strong>Fecha:</strong>{" "}
            {new Date(order.date).toLocaleString("es-MX")}
          </p>
        </OrderSection>

        <OrderSection>
          <h2>Datos de entrega</h2>
          <p>
            <strong>Cliente:</strong> {customer.name}{" "}
            {customer.lastName}
          </p>
          <p>
            <strong>Teléfono:</strong> {customer.phone}
          </p>
          <p>
            <strong>Dirección:</strong> {customer.street}{" "}
            {customer.number}, {customer.neighborhood}
          </p>
          <p>
            {customer.city}, {customer.state}, C.P.{" "}
            {customer.zipCode}
          </p>
        </OrderSection>

        <OrderSection>
          <h2>Método de pago</h2>
          <p>{paymentText}</p>
          <p>Compra de demostración, sin cobro real.</p>
        </OrderSection>

        <OrderSection>
          <h2>Productos comprados</h2>

          {items.map((item) => (
            <OrderRow key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                {formatPrice(item.price * item.quantity)}
              </span>
            </OrderRow>
          ))}

          <OrderTotal>
            <span>Total del pedido</span>
            <span>{formatPrice(total)}</span>
          </OrderTotal>
        </OrderSection>

       <BackButton>
  <Link to="/">Volver a la tienda</Link>
</BackButton>
      </ConfirmationCard>
    </Container>
  );
};

export default OrderConfirmation;
