import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    await api.post('/auth/register', { email, password });
    navigate('/login');
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    alert(error.response?.data?.message || 'Registration failed');
  }
};

  return (
    <div className="p-6">
      <input className="border p-2 mb-2" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input className="border p-2 mb-2" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button className="bg-green-500 text-white px-4 py-2" onClick={handleRegister}>Register</button>
    </div>
  );
}