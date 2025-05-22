import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="border rounded p-4 shadow">
      <img src={product.image} alt={product.title} className="h-40 w-full object-cover mb-2" />
      <h3 className="font-bold">{product.title}</h3>
      {product.soldOut ? <p className="text-gray-600">Sold Out</p> : <p className="text-gray-600">₹{product.price}</p>}
    </Link>
  )
}

export default ProductCard