import React, { useEffect, useState } from 'react';
import { privateApi } from '../services/privateapi';

const initialForm = {
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
};

const SellerDashboard = () => {
    const [form, setForm] = useState(initialForm);
    const [products, setProducts] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Fetch seller's products
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await privateApi().get('/products');
            // Only show products belonging to the logged-in seller
            const myProducts = res.data.data.filter(
                p => p.seller && p.seller._id === JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId
            );
            setProducts(myProducts);
        } catch (err) {
            setMessage('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle form input
    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // Create or update product
    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            if (editingId) {
                // Update
                const res = await privateApi().patch(`/products/${editingId}`, form);
                setMessage(res.data.message || 'Product updated!');
            } else {
                // Create
                await privateApi().post('/products', form);
                setMessage('Product created!');
            }
            setForm(initialForm);
            setEditingId(null);
            fetchProducts();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error saving product');
        } finally {
            setLoading(false);
        }
    };

    // Edit product
    const handleEdit = product => {
        setForm({
            title: product.title,
            description: product.description,
            price: product.price,
            image: product.image || '',
            category: product.category,
        });
        setEditingId(product._id);
        setMessage('');
    };

    // Mark as sold
    const handleMarkSold = async id => {
        setLoading(true);
        setMessage('');
        try {
            const res = await privateApi().patch(`/products/${id}`, { soldOut: true });
            setMessage(res.data.message || 'Product marked as sold!');
            fetchProducts();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Error updating product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Seller Dashboard</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 mb-8 space-y-4">
                <h3 className="text-lg font-semibold mb-2">{editingId ? 'Edit Product' : 'Create Product'}</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                />

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {editingId ? 'Update' : 'Create'}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                            onClick={() => { setForm(initialForm); setEditingId(null); setMessage(''); }}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                    )}
                </div>
                {message && <div className="text-center text-blue-600 font-medium mt-2">{message}</div>}
            </form>
            <h3 className="text-lg font-semibold mb-4">Your Products</h3>
            {loading ? (
                <div>Loading...</div>
            ) : products.length === 0 ? (
                <div className="text-gray-500">No products found.</div>
            ) : (
                <div className="grid gap-4">
                    {products.map(product => (
                        <div key={product._id} className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <div className="font-bold text-lg">{product.title}</div>
                                <div className="text-gray-600">{product.description}</div>
                                <div className="text-gray-600">{product.category}</div>
                                <div className="text-blue-600 font-semibold">₹{product.price}</div>
                                {product.sold && <div className="text-red-500 font-bold">SOLD OUT</div>}
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button
                                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
                                    onClick={() => handleEdit(product)}
                                    disabled={product.sold}
                                >
                                    Edit
                                </button>
                                {!product.sold && (
                                    <button
                                        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                                        onClick={() => handleMarkSold(product._id)}
                                    >
                                        Mark as Sold
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SellerDashboard;