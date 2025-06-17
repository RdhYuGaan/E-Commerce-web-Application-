import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  return (
    <div className="p-6">
      <input className="border p-2 mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input className="border p-2 mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleLogin}>Login</button>
    </div>
  );
}