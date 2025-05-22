import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
    if (!product) return null;

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
            {product.image && (
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded mb-6"
                />
            )}
            <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
            <div className="text-gray-600 mb-2">{product.category}</div>
            <div className="text-blue-600 text-xl font-semibold mb-4">₹{product.price}</div>
            <div className="mb-4 text-gray-700">{product.description}</div>
            {product.sold && <div className="text-red-500 font-bold mb-2">SOLD OUT</div>}
            <div className="text-sm text-gray-500 mt-4">
                <span>Seller: {product.seller?.name || 'Unknown'} ({product.seller?.email || 'N/A'})</span>
            </div>
            <div className="text-xs text-gray-400 mt-2">Product ID: {product._id}</div>
        </div>
    );
};

export default ProductDetails;