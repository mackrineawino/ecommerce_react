import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNav from "./AdminNavBar";
import { FaProductHunt } from "react-icons/fa6";

import GenericTable from "../../components/GenericTable";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/ecommerce/rest/products/list');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const columns = ["id", "imageUrl", "productName", "price", "availability", "productDescription", "category"];

  const handleEdit = (item) => {
    // Implement your edit logic here
    console.log("Edit item:", item);
  };

  const handleDelete = async (itemId) => {
    try {
      // Make a DELETE request to the backend endpoint
      await axios.delete(`http://localhost:8080/ecommerce/rest/products/delete/${itemId}`);

      // Remove the deleted item from the local state
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== itemId));
      
      console.log(`Item with id ${itemId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="h-screen">
      <AdminNav>
      {products.length === 0 ? (
        // Display empty order message when there are no orders
        <div className="flex flex-col items-center justify-center h-screen ">
          <div><FaProductHunt  className="text-blue-500 text-[90px]" /></div>
          <p className="text-pink-500 text-2xl mt-[30px]">No Products Available At The Moment.</p>
          <div className="mb-20 mt-[30px]">
            <a
              href="/addproducts"
              className="block py-2 px-6 text-white bg-blue-500 rounded-md transition duration-300 ease-in-out hover:bg-pink-500"
            >
              ADD PRODUCTS
            </a>
          </div>
        </div>
      ) :(
        <div className="flex flex-col items-center">
        <div className="text-left bg-blue-500 px-4 py-2 text-white rounded mb-5 hover:bg-pink-500">
          <Link to="/addproducts">Add Product</Link>
        </div>
        <h2 className="mb-5">Items Table</h2>
        <GenericTable data={products} columns={columns} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      )
      }
      </AdminNav>
    </div>
  );
};

export default ViewProducts;
