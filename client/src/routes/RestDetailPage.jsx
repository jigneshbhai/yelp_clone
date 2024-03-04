import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestoApi from "../api/RestoApi";
import StartRating from "../components/StartRating";
import Reviews from "../components/Reviews";

const RestDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestoApi.get(`${id}`);
        console.log(response);

        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

 return (
   <div>
     {selectedRestaurant ? (
       <>
         <h1 className="text-center display-1">
           {selectedRestaurant.rest.name}
         </h1>
         <div>
           <StartRating rating={selectedRestaurant.rest.average_rating} />
           <span className="text-warning ml-1">
             {selectedRestaurant.rest.count
               ? `(${selectedRestaurant.rest.count})`
               : "(0)"}
           </span>
         </div>
         <div>
           {selectedRestaurant.reviews &&
           selectedRestaurant.reviews.length > 0 ? (
             <Reviews reviews={selectedRestaurant.reviews} />
           ) : (
             <p>No reviews available</p>
           )}
         </div>
       </>
     ) : (
       <p>Loading...</p>
     )}
   </div>
 );

};

export default RestDetailPage;
