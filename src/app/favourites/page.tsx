"use client";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { getDataFromToken } from "@/helpers/getDataFromToken";

const page = () => {
  const [favourites, setFavourites] = useState([]);

  const getFavourites = async () => {
    try {
      const response = await axios.get("/api/favourite");
      setFavourites(response.data.favourites || []);
    } catch (error) {
      console.log("Error fetching favourites:", error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-4xl text-white font-bold">My favourites</h1>

      {favourites.length === 0 ? (
        <p>No favourites found</p>
      ) : (
        favourites.map((fav: any, index: number) => (
          <div key={index} className="mt-4">
            <p className="font-semibold">{fav.title}</p>
            <p>{fav.year}</p>
            <img
              src={fav.poster}
              alt={fav.title}
              className="w-32 mt-2 rounded-md shadow-md"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default page;
