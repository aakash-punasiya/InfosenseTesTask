import React, { useState, useEffect } from 'react';
import '../CartList.css';
import LazyLoad from 'react-lazyload';
import { Navbar } from './Navbar';

const CartList = () => {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/carts');
      const data = await response.json();
      setCarts(data);
    } catch (error) {
      console.error('Error fetching carts:', error);
    }
  };

  return (
    <Navbar>
    <div className="cart-list-container">
      <h2>Cart List</h2>
      {carts?.carts?.map(cart => (
        <div className="cart" key={cart.id}>
          <h3>Cart ID: {cart.id}</h3>
          <p>Total Products: {cart.totalProducts}</p>
          <p>Total Quantity: {cart.totalQuantity}</p>
          <p>Total Price: ${cart.total}</p>
          <p>Discounted Total: ${cart.discountedTotal}</p>
          <div className="product-list">
            {cart.products.map(product => (
               <LazyLoad key={product.id} height={200} once>
              <div className="product" >
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-details">
                  <h4>{product.title}</h4>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Total: ${product.total}</p>
                  <p>Discount Percentage: {product.discountPercentage}%</p>
                  <p>Discounted Price: ${product.discountedPrice}</p>
                </div>
              </div>
              </LazyLoad>
            ))}
          </div>
        </div>
      ))}
    </div>
    </Navbar>
  );
};

export default CartList;
