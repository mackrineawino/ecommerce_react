import React, { useState } from 'react';
import AdminNav from './AdminNavBar';
import axios from 'axios';

const AddProducts = () => {
  
  const [formData, setFormData] = useState({
    imageUrl: '',
    productName: '',
    price: 0,
    availability: 0,
    productDescription: '',
    category: 'DEFAULT_CATEGORY', // Set a default category value
  });

  const categories = ['SNEAKER', 'BOOT', 'DOLL_SHOE', 'STILETTO'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend API
      const response = await axios.post('http://localhost:8080/ecommerce/rest/products/add', formData);

      // Handle the response as needed
      console.log('Product added successfully:', response.data);

      // Reset form after submission
      setFormData({
        imageUrl: '',
        productName: '',
        price: 0,
        availability: 0,
        productDescription: '',
        category: 'DEFAULT_CATEGORY',
      });
    } catch (error) {
      // Handle errors
      console.error('Error adding product:', error);
    }
  };


  return (
    <div className=" h-screen">
      <AdminNav>
        <div className="flex justify-center h-screen">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-[600px] mb-8 mt-[-27px]">
            <h1 className='text-center mt-[-15px] text-blue-500'>Add Product</h1>

            <div className="mb-4 mt-[1px]">
              <label className="block text-sm font-medium text-gray-700">Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Name:</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Availability:</label>
              <input
                type="number"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Description:</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              >
                <option value="DEFAULT_CATEGORY" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-pink-500">
              Add Product
            </button>
          </form>
        </div>
      </AdminNav>
    </div>
  );
};

export default AddProducts;
