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

  const [successMessage, setSuccessMessage] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const [availabilityError, setAvailabilityError] = useState(null);

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
      // Check for valid price
      if (formData.price <= 0) {
        setPriceError('Price must be greater than 0');
        return;
      } else {
        setPriceError(null);
      }

      // Check for valid availability
      if (formData.availability <= 0) {
        setAvailabilityError('Availability must be greater than 0');
        return;
      } else {
        setAvailabilityError(null);
      }

      // Make a POST request to the backend API
      const response = await axios.post('http://localhost:8080/ecommerce/rest/products/add', formData);

      // Handle the response as needed
      console.log('Product added successfully:', response.data);

      // Display success message
      setSuccessMessage('Product added successfully!');

      // Reset form after submission
      setFormData({
        imageUrl: '',
        productName: '',
        price: 0,
        availability: 0,
        productDescription: '',
        category: 'DEFAULT_CATEGORY',
      });

      // Clear success message after a delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // Clear after 5 seconds (adjust as needed)
    } catch (error) {
      // Handle errors
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="h-screen">
      <AdminNav>
        <div className="flex justify-center mt-[30px]">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-[1000px] mb-8 mt-[-27px]">
            <h1 className="text-center mt-[10px] mb-[20px] text-blue-500 text-[30px]">Add Product</h1><hr /><br></br>

            {/* Success message */}
            {successMessage && (
              <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
                {successMessage}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4 mt-[1px]">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL:</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Price:</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required />
                {/* Price error message */}
                {priceError && <p className="text-red-500">{priceError}</p>}
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Availability:</label>
                <input
                  type="number"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                  required />
                {/* Availability error message */}
                {availabilityError && <p className="text-red-500">{availabilityError}</p>}
              </div>


            </div>
            {/* Product Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 mb-4 p-2 border border-gray-300 rounded w-full custom-select" // Use a custom class
                required>
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
            {/* Product Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Description:</label>
              <textarea
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required />
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
