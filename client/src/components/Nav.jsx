import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <nav className="p-4 bg-blue-600 text-white flex justify-between">
      <div className="font-bold">MyShop</div>
      <div className="flex gap-4">
        <Link to="/">Products</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}