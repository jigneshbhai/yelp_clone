import React from 'react'
import UpdateResto from '../components/UpdateResto';

const UpdatePage = () => {
  return (
    <div>
      <h1 className="text-white text-4xl font-semibold text-center bg-blue-500 py-4 mb-8">
        Update Restaurants
      </h1>
      <UpdateResto />
    </div>
  );
}

export default UpdatePage