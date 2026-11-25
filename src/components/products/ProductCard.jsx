
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice.js";

import {
  Card,
  ProductImage,
  ProductName,
  Description,
  Presentation,
  Price,
  AddButton,
} from "./ProductCard.styles.js";

// Tarjeta de cada producto.
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card>
      <ProductImage
        src={product.image}
        alt={product.name}
        loading="lazy"
      />

      <ProductName>{product.name}</ProductName>

      <Description>{product.description}</Description>

      <Presentation>{product.presentation}</Presentation>

      <Price>
        {product.price.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN",
        })}
      </Price>

      <AddButton type="button" onClick={handleAddToCart}>
        Agregar al carrito
      </AddButton>
    </Card>
  );
};

export default ProductCard;
