import React from "react";

const GenericTable = ({ data, columns, onEdit, onDelete }) => {
  return (
    <table className="table border-collapse border border-gray-300 bg-gray-800 text-white">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index} className="border border-gray-300 p-4">
              {column}
            </th>
          ))}
          <th className="border border-gray-300 p-4">Edit</th>
          <th className="border border-gray-300 p-4">Delete</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border border-gray-300">
            {columns.map((column, columnIndex) => (
              <td key={columnIndex} className="border border-gray-300 p-4">
                {item[column]}
              </td>
            ))}
            <td className="border border-gray-300 p-4">
  <button onClick={() => onEdit(item)} className="bg-blue-500 px-4 py-2 text-white rounded">
    Edit
  </button>
</td>
            <td className="border border-gray-300 p-4">
  <button onClick={() => onDelete(item)} className="bg-pink-500 px-4 py-2 text-white rounded">
    Delete
  </button>
</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;
