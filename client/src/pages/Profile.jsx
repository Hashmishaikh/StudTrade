import { useEffect, useState } from 'react';
import axios from '../services/api';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

const Profile = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products/my').then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Listings</h2>
      <button className="btn mb-4" onClick={logout}>Logout</button>

      {products.length === 0 ? (
        <p>You haven’t listed anything yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Profile;
