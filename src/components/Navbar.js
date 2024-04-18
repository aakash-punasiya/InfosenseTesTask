import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ children }) => {
  return (
    <>
      <nav className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">
            My App
          </Link>
          <ul className="flex space-x-4">
            <li>
              <Link to="/products" className="text-white hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/carts" className="text-white hover:text-gray-300">
                Carts
              </Link>
            </li>
            <li>
              <Link to="/recipes" className="text-white hover:text-gray-300">
                Recipes
              </Link>
            </li>
            <li>
              <Link to="/users" className="text-white hover:text-gray-300">
                Users
              </Link>
            </li>
            <li>
              <Link to="/posts" className="text-white hover:text-gray-300">
                Posts
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {children}
    </>
  );
};
