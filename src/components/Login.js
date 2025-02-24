import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async (role) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password, role });
      localStorage.setItem('token', response.data.token);
      if (role === 'shop_owner') {
        history.push('/shop-owner/dashboard');
      } else {
        history.push('/distributor/dashboard');
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => handleLogin('shop_owner')}>Login as Shop Owner</button>
      <button onClick={() => handleLogin('distributor')}>Login as Distributor</button>
    </div>
  );
};

export default Login;
