import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate required fields
    if (!form.email || !form.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const res = await axios.post('/auth/login', form);
      console.log('res', res)
      localStorage.setItem('token', res.data.token);
      setUser(res.data);
      navigate('/');
    } catch (err) {
      // console.log('err', err)
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Sign in to your account</h2>
        <div className="space-y-4">
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
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
        <div className="text-center text-sm text-gray-500 mt-2">
          Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;