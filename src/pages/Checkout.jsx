import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice.js";

import {
  Container,
  CheckoutLayout,
  Form,
  Section,
  FormGrid,
  FormGroup,
  Input,
  Select,
  PaymentOption,
  Summary,
  SummaryRow,
  Total,
  ConfirmButton,
  BackLink,
  SavePaymentButton,
  PaymentMessage,
} from "./Checkout.styles.js";

// Página para finalizar la compra.
const Checkout = () => {
 
  const navigate = useNavigate();
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.items);

  const [address, setAddress] = useState({
    name: "",
    lastName: "",
    phone: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
  });

 const [paymentMethod, setPaymentMethod] = useState("cash");
const [paymentSaved, setPaymentSaved] = useState(false);
const [orderConfirmed, setOrderConfirmed] = useState(false);
const handlePaymentChange = (event) => {
  setPaymentMethod(event.target.value);
  setPaymentSaved(false);
};

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

 // Guardamos el pedido y vaciamos el carrito.
const handleSubmit = (event) => {
  event.preventDefault();

  if (!paymentSaved) {
    alert("Primero debes guardar el método de pago.");
    return;
  }

  const order = {
    id: Date.now(),
    customer: address,
    paymentMethod,
    items: cartItems.map((item) => ({ ...item })),
    total: subtotal,
    date: new Date().toISOString(),
  };

  sessionStorage.setItem(
    "elBuenMandadoOrder",
    JSON.stringify(order)
  );

  setOrderConfirmed(true);
dispatch(clearCart());
navigate("/confirmacion", { replace: true });
};

 if (orderConfirmed) {
  return <Navigate to="/confirmacion" replace />;
}

if (cartItems.length === 0) {
  return <Navigate to="/carrito" replace />;
}

  return (
    <Container>
      <h1>Finalizar compra</h1>

      <CheckoutLayout>
        <Form id="checkout-form" onSubmit={handleSubmit}>
          <Section>
            <h2>Dirección de entrega</h2>

            <FormGrid>
              <FormGroup>
                <label htmlFor="name">Nombre</label>
                <Input
                  id="name"
                  name="name"
                  value={address.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="lastName">Apellidos</label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={address.lastName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="phone">Teléfono</label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  placeholder="10 dígitos"
                  value={address.phone}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="zipCode">Código postal</label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                  placeholder="5 dígitos"
                  value={address.zipCode}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="street">Calle</label>
                <Input
                  id="street"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="number">Número exterior</label>
                <Input
                  id="number"
                  name="number"
                  value={address.number}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="neighborhood">Colonia</label>
                <Input
                  id="neighborhood"
                  name="neighborhood"
                  value={address.neighborhood}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="city">Ciudad o municipio</label>
                <Input
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="state">Estado</label>
                <Select
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un estado</option>
                  {[
                    "Aguascalientes", "Baja California",
                    "Baja California Sur", "Campeche", "Chiapas",
                    "Chihuahua", "Ciudad de México", "Coahuila",
                    "Colima", "Durango", "Estado de México",
                    "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
                    "Michoacán", "Morelos", "Nayarit", "Nuevo León",
                    "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
                    "San Luis Potosí", "Sinaloa", "Sonora",
                    "Tabasco", "Tamaulipas", "Tlaxcala",
                    "Veracruz", "Yucatán", "Zacatecas",
                  ].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </FormGrid>
          </Section>

          <Section>
  <h2>Método de pago</h2>

  <PaymentOption>
    <input
      type="radio"
      name="paymentMethod"
      value="cash"
      checked={paymentMethod === "cash"}
      onChange={handlePaymentChange}
    />
    Efectivo contra entrega
  </PaymentOption>

  <PaymentOption>
    <input
      type="radio"
      name="paymentMethod"
      value="card"
      checked={paymentMethod === "card"}
      onChange={handlePaymentChange}
    />
    Tarjeta bancaria
  </PaymentOption>

  <p>
    Compra de prueba.
  </p>

  <SavePaymentButton
    type="button"
    onClick={() => setPaymentSaved(true)}
  >
    Guardar método de pago
  </SavePaymentButton>

  {paymentSaved && (
    <PaymentMessage role="status">
      Método de pago guardado correctamente.
    </PaymentMessage>
  )}
</Section>
        </Form>

        <Summary>
          <h2>Resumen del pedido</h2>

          {cartItems.map((item) => (
            <SummaryRow key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                {formatPrice(item.price * item.quantity)}
              </span>
            </SummaryRow>
          ))}

          <SummaryRow>
            <span>Productos</span>
            <span>{totalItems}</span>
          </SummaryRow>

          <Total>
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </Total>

          <ConfirmButton type="submit" form="checkout-form">
            Confirmar pedido
          </ConfirmButton>

          <BackLink>
            <Link to="/carrito">Volver al carrito</Link>
          </BackLink>
        </Summary>
      </CheckoutLayout>
    </Container>
  );
};

export default Checkout;
