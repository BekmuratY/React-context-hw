import React, { useState, createContext, useContext } from "react";

// Создаем контекст для управления темой
const ThemeContext = createContext();

// Компонент списка товаров
const ProductList = ({ products }) => {
  // Получаем текущую тему из контекста
  const { theme } = useContext(ThemeContext);

  return (
    <div style={{ color: theme.color, fontFamily: theme.fontFamily }}>
      <h1>Product List</h1>
      {products.map((product, index) => (
        <div key={index}>
          <h3>{product.name}</h3>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

// Компонент кнопки для смены темы
const ThemeToggle = () => {
  // Получаем функцию для изменения темы из контекста
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>Toggle Theme</button>
  );
};

// Компонент кнопки для сортировки товаров
const FilterButton = ({ onFilter }) => {
  return (
    <button onClick={onFilter}>Sort by Price</button>
  );
};

const App = () => {
  // Данные о товарах
  const [products, setProducts] = useState([
    { name: "Product 1", price: 50 },
    { name: "Product 2", price: 30 },
    { name: "Product 3", price: 80 },
    { name: "Product 4", price: 20 },
    { name: "Product 5", price: 100 }
  ]);

  // Состояние для текущей темы
  const [theme, setTheme] = useState({
    color: "black",
    fontFamily: "Arial"
  });

  // Функция для смены темы
  const toggleTheme = () => {
    setTheme(prevTheme => ({
      color: prevTheme.color === "black" ? "blue" : "black",
      fontFamily: prevTheme.fontFamily === "Arial" ? "Verdana" : "Arial"
    }));
  };

  // Функция для сортировки товаров по цене
  const sortProducts = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>
        <ThemeToggle />
        <FilterButton onFilter={sortProducts} />
        <ProductList products={products} />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
