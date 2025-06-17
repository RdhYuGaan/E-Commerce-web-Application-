import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data));
  }, []);

  const placeOrder = async (productId) => {
    await api.post('/orders', { productId });
    alert('Order placed!');
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p.id} className="border p-4 rounded shadow">
          <h2 className="font-bold">{p.name}</h2>
          <p>Rs. {p.price}</p>
          <button className="bg-blue-600 text-white px-4 py-1 mt-2" onClick={() => placeOrder(p.id)}>Order</button>
        </div>
      ))}
    </div>
  );
}