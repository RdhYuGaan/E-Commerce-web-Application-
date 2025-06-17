import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get('/orders');
    setOrders(res.data);
  };

  const cancelOrder = async (orderId) => {
    await api.put(`/orders/${orderId}`);
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      {orders.map(o => (
        <div key={o.id} className="border p-3 mb-2 flex justify-between">
          <span>{o.product_name} - {o.status}</span>
          {o.status === 'placed' && <button onClick={() => cancelOrder(o.id)} className="bg-red-500 text-white px-2">Cancel</button>}
        </div>
      ))}
    </div>
  );
}