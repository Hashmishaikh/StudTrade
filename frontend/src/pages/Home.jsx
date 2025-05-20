import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import api from '../services/api'

const Home = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const {data} = await api.get('/products')
            console.log('res', data?.data)
            setProducts(data?.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getProducts()
    }, []);
  return (
    <div>
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products?.map(prod => (
            <ProductCard key={prod._id} product={prod} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
          <p className="text-gray-400">Check back later for new products</p>
        </div>
      )}
    </div>
  )
}

export default Home