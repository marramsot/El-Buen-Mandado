
import { useState } from "react";
import ProductCard from "../components/products/ProductCard.jsx";
import { products, categories } from "../data/products.js";

import {
  Container,
  Banner,
  SearchInput,
  Categories,
  CategoryButton,
  ProductGrid,
  EmptyMessage,
} from "./Home.styles.js";

// Página principal de la tienda.
const Home = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtramos los productos.
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    const matchesCategory =
      search.trim() !== "" ||
      selectedCategory === "Todos" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <Container>
      <Banner>
        <h1>Bienvenido a El Buen Mandado</h1>
        <p>Todo lo que necesitas, cerquita de ti.</p>
        <p lang="en">Welcome to our store!</p>
      </Banner>

      <h2 id="products-title">Nuestros productos</h2>

      <SearchInput
        type="search"
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <Categories aria-label="Categorías de productos">
        {categories.map((category) => (
          <CategoryButton
            key={category}
            type="button"
            $active={selectedCategory === category}
            aria-pressed={selectedCategory === category}
            onClick={() => {
              setSelectedCategory(category);
              setSearch("");
            }}
          >
            {category}
          </CategoryButton>
        ))}
      </Categories>

      {filteredProducts.length > 0 ? (
        <ProductGrid aria-labelledby="products-title">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <EmptyMessage role="alert">
  No encontramos productos con esa búsqueda.
</EmptyMessage>
      )}
    </Container>
  );
};

export default Home;
