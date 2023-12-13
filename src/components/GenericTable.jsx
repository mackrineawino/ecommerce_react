import React, { useState } from "react";

const GenericTable = ({ data, columns, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleConfirmDelete = () => {
    // Implement your confirm delete logic here
    console.log("Item confirmed for deletion");
    // Call the onDelete callback with the item ID
    if (deleteItemId !== null) {
      onDelete(deleteItemId);
    }
    // Close the modal
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    // Implement your cancel delete logic here
    console.log("Delete operation canceled");
    // Clear the delete item ID and close the modal
    setDeleteItemId(null);
    setShowModal(false);
  };

  return (
    <div className="table-container overflow-y-auto h-screen">
      <table className="table border-collapse border border-gray-300 bg-gray-800 text-white rounded">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="sticky top-0 bg-gray-800 border border-gray-300 p-4">
                {column}
              </th>
            ))}
            <th className="sticky top-0 bg-gray-800 border border-gray-300 p-4">Edit</th>
            <th className="sticky top-0 bg-gray-800 border border-gray-300 p-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border border-gray-300">
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="border border-gray-300 p-4">
                  {column === "imageUrl" ? (
                    <img src={item[column]} alt="Product" className="max-w-40 max-h-40" />
                  ) : (
                    column === "productDescription" ? item[column] : item[column]
                  )}
                </td>
              ))}
              <td className="border border-gray-300 p-4">
                <button onClick={() => onEdit(item)} className="bg-blue-500 px-4 py-2 text-white rounded">
                  Edit
                </button>
              </td>
              <td className="border border-gray-300 p-4">
                <button
                  onClick={() => {
                    // Set the delete item ID and show the modal
                    setDeleteItemId(item.id);
                    setShowModal(true);
                  }}
                  className="bg-pink-500 px-4 py-2 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="modal-content bg-blue-200 p-8 rounded-md shadow-md w-[500px]">
            <p className="mb-[20px]">Continue to delete this item? This action is irreversible.</p>
            <button onClick={handleConfirmDelete} className="bg-pink-500 text-white px-4 py-2 rounded  ">
              Yes
            </button>
            <button onClick={handleCancelDelete} className="bg-blue-500 text-white px-4 py-2  ml-[20px] rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericTable;
