import React from 'react'
import AdminNav from './AdminNavBar'
import GenericTable from '../../components/GenericTable';


const ViewUsers = () => {
  const data = [
    { id: 1, name: 'Item 1', price: 20 },
    { id: 2, name: 'Item 2', price: 30 },

  ];

  const columns = ['id', 'name', 'price'];

  return (
    <div className="h-screen">
      <AdminNav>
        <div className="flex flex-col items-center">
        <h2>Users Table</h2>
      <GenericTable data={data} columns={columns} />
        </div>
      
    </AdminNav>
    </div>
  )
}

export default ViewUsers
