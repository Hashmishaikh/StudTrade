import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      <input type="text" name="name" placeholder="Name" className="input" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="input" onChange={handleChange} />
      <button type="submit" className="btn">Register</button>
    </form>
  );
};

export default Register;
