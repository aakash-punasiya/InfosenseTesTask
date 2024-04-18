import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/Login";
import Product from "./components/Product";
import CartList from "./components/CartList";
import RecipeList from "./components/RecipeList";
import PostList from "./components/PostList";
import CommentList from "./components/CommentList";
import NotFound from "./components/NotFound";
import UserList from "./components/UserList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(null);
  
  
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Login setToken={setToken} token={token} />}
          />
          <Route path="/products" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard token={token} />} />
          <Route path="/carts" element={<CartList />} />
          <Route path="/recipes" element={<RecipeList />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/comments/:id" element={<CommentList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer/>
    </Router>
  );
}

export default App;
