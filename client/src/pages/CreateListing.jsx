import { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { uploadImage } from '../utils/uploadImage';

const CreateListing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    const url = await uploadImage(file);
    setForm({ ...form, image: url });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/products', form);
      navigate('/');
    } catch (err) {
      alert('Listing creation failed!');
    }
  };

  if (!user) return <p>Please login to create a listing.</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Create a Listing</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      <input name="title" placeholder="Title" className="input" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" className="input" onChange={handleChange} />
      <input name="category" placeholder="Category" className="input" onChange={handleChange} />
      <input name="image" placeholder="Image URL" className="input" onChange={handleChange} />
      <textarea name="description" placeholder="Description" className="input" onChange={handleChange} />
      <button type="submit" className="btn">Create</button>
    </form>
  );
};

export default CreateListing;