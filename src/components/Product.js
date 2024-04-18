import React, { useState, useEffect } from "react";
import "../ProductList.css";
import { Navbar } from "./Navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <Navbar>
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="product-list">
        {products?.products?.map((product) => (
          <div className="product" key={product.id}>
            <img src={product.images[0]} alt={product.name} />
            <div className="product-details">
              <h3>{product.name}</h3>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Navbar>
  );
};

export default ProductList;
