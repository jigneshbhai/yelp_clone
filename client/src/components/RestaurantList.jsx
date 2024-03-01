import React, { useContext, useEffect } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestoApi from "../api/RestoApi";
import { useNavigate } from "react-router-dom";

const RestaurantList = (props) => {
  // Pass history as a prop
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestoApi.get("/");
        console.log(response.data.data);
        setRestaurants(response.data.data.restaurants);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestoApi.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Restaurant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price Range
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ratings
            </th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Edit
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {restaurant.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {restaurant.location}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {"$".repeat(restaurant.price_range)}
                </div>
              </td>
              {/* Add Ratings column if needed */}
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={(e) => handleUpdate(e, restaurant.id)}
                >
                  Update
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  className="text-red-600 hover:text-red-900"
                  onClick={(e) => handleDelete(e, restaurant.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
