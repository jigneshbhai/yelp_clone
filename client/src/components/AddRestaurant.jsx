import React, { useContext, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestoApi from "../api/RestoApi";

const AddRestaurant = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("Price Range");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestoApi.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      //console.log("Response data:", response.data);
      const { data } = response.data;
      if (data && data.rest) {
        //console.log("Restaurant data:", data.rest);
        addRestaurants(data.rest);
      } else {
        console.error("Restaurant data not found in response:", data);
      }
    } catch (err) {
      console.error("Error adding restaurant:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Add New Restaurant</h2>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-gray-700">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="input-field"
            placeholder="Enter name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field"
            type="text"
            placeholder="Enter location"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="input-field"
          >
            <option disabled>Choose price range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Add Restaurant
        </button>
      </form>
    </div>
  );
};

export default AddRestaurant;
