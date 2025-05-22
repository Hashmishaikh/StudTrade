import React from 'react'
import { Link } from 'react-router-dom'

export const CutomerLinks = ({user, handleLogout}) => {
  return (
    <div>
        <div className="flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Home</Link>
            {user && user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Profile</Link>
                <button onClick={handleLogout} className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 focus:outline-none bg-transparent border-none cursor-pointer">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Login</Link>
                <Link to="/register" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">Register</Link>
              </>
            )}
          </div>
    </div>
  )
}
