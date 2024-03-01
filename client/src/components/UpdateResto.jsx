import React, { useContext, useEffect, useState } from "react";
import RestoApi from "../api/RestoApi";
import { useParams, useNavigate } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";

const UpdateResto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestoApi.get(`/${id}`);
        setName(response.data.data.rest.name);
        setLocation(response.data.data.rest.location);
        setPriceRange(response.data.data.rest.price_range);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestoApi.put(`/${id}`, {
        name,
        location,
        price_range: priceRange,
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Update Restaurant</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 mb-2">
            Location
          </label>
          <input
            id="location"
            type="text"
            className="form-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price_range" className="block text-gray-700 mb-2">
            Price Range
          </label>
          <input
            id="price_range"
            type="number"
            className="form-input"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateResto;
