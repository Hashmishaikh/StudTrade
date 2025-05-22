import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = ({ sellerOnly = false }) => {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState(sellerOnly ? 'seller' : 'customer');
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate required fields
    if (!form.email || !form.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Determine isSeller value for API
    let isSeller = undefined;
    if (sellerOnly) {
      isSeller = true;
    } else if (activeTab === 'seller') {
      isSeller = true;
    } else if (activeTab === 'customer') {
      isSeller = false;
    }

    try {
      const res = await axios.post('/auth/login', { ...form, isSeller });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      // Only redirect to seller-dashboard if logging in as seller
      if (sellerOnly || activeTab === 'seller') {
        navigate('/seller-dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        {!sellerOnly && (
          <div className="flex mb-6">
            <button
              type="button"
              onClick={() => handleTabChange('customer')}
              className={`flex-1 py-2 rounded-l-lg font-semibold transition-colors duration-200 ${activeTab === 'customer' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('seller')}
              className={`flex-1 py-2 rounded-r-lg font-semibold transition-colors duration-200 ${activeTab === 'seller' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
            >
              Seller
            </button>
          </div>
        )}
        {sellerOnly && (
          <div className="mb-6 text-center">
            <span className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-lg">Seller Login</span>
          </div>
        )}
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