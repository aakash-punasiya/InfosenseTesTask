import React, { useState } from "react";
import "../Login.css"
import {  toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Login = ({ setToken, token }) => {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const handleLogin = () => {
    
    if (username.trim().length < 4) {
      toast.error('Username must be at least 4 characters long.');
      return;
    }
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(password)) {
      toast.error(
        'Password must contain at least one uppercase letter, one number, and one special character.'
      );
      return;
    }
    if (password.trim().length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }
    setError('');

    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "token": token },
      body: JSON.stringify({
        username: 'kminchelle',
        password: '0lelplR',
        expiresInMins: 30,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const token = data.token;
        setToken(token);
        sessionStorage.setItem('token',token)
        navigate('/dashboard')
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };
  return (
    
    <div className="w-full max-w-xs mx-auto mt-8">
    <input
      className="w-full mb-4 px-3 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <div className="relative">
      <input
        className="w-full mb-4 px-3 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
     <button
          type="button"
          className="absolute right-0 px-4 py-2"
          onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
        >
          <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} className="text-gray-500" />
        </button>
    </div>
    <button
      className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleLogin}
    >
      Login
    </button>
  </div>

  );
};

export default Login;
