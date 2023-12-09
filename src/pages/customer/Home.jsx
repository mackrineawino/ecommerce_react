import React from 'react'
import Nav from './NavBar'
import ProductGrid from '../../components/ProductGrid'

const Home = () => {
  const products = [
    { id: 1, imageUrl: 'https://github.com/mackrineawino/images/blob/main/805sa-pink-40-saheb-pink-original-imafghzfctaf4xdy-removebg-preview.png?raw=true', productName: 'Product 1', availability: 10, category: 'Category A' },
    // Add more products as needed
  ];

  return (
   
    <div>
       <Nav/>
       <ProductGrid products={products} />
    </div>
  )
}

export default Home
