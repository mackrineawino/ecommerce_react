import React from "react";
import AdminNav from "./AdminNavBar";
import GenericTable from "../../components/GenericTable";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  const data = [
    { id: 1, name: "Item 1", price: 20 },
    { id: 2, name: "Item 2", price: 30 },
  ];

  const columns = ["id", "name", "price"];

  return (
    <div className="h-screen">
      <AdminNav>
        <div className="flex flex-col items-center">
        <div className="text-left bg-blue-500 px-4 py-2 text-white rounded mb-5 hover:bg-pink-500">
            <Link to="/addproducts">Add Product</Link>
          </div>
          <h2 className="mb-5">Items Table</h2>
         
          <GenericTable data={data} columns={columns} />
        </div>
      </AdminNav>
    </div>
  );
};

export default ViewProducts;
