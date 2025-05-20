import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', isSeller: false });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    try {
      const res = await axios.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create your account</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 text-gray-800"
            onChange={handleChange}
            autoComplete="name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 text-gray-800"
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-400 text-gray-800"
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <label className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name="isSeller"
              checked={form.isSeller}
              onChange={handleChange}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span>Register as Seller</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Register
        </button>
        <div className="text-center text-sm text-gray-500 mt-2">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Register;