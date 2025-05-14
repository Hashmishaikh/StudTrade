import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', form);
      setUser(res.data);
      navigate('/');
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} />
      <button type="submit" className="btn">Login</button>
    </form>
  );
};

export default Login;
