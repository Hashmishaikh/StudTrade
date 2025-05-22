import React from 'react'
import { Link } from 'react-router-dom'

const SellerLink = ({ handleLogout }) => {
    return (
        <div className="flex space-x-6">
            <Link to="/seller-dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Seller Dashboard</Link>
            <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Profile</Link>
            <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none bg-transparent border-none cursor-pointer">Logout</button>
        </div>
    )
}

export default SellerLink