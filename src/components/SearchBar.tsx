"use client";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface searchBarProps {
  movieName: string;
  setMovieName: (name: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ movieName, setMovieName, onSearch }: searchBarProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!movieName.trim()) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await axios.get("https://www.omdbapi.com/", {
          params: {
            s: movieName,
            apiKey: process.env.NEXT_PUBLIC_OMDB_KEY,
          },
        });
        setSuggestions(res.data.Search || []);
      } catch (error) {
        console.log("error fetching suggestions", error);
      }
    };
    fetchSuggestions();
  }, [movieName]);

  const handleSelect = (movie: any) => {
    setMovieName(movie.Title);
    setSuggestions([]);
  };
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-96">
      {/* Search bar */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Search movies..."
          className="border px-4 py-2 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white text-black border rounded-lg w-full mt-2 max-h-64 overflow-y-auto shadow-lg z-50">
          {suggestions.map((movie) => (
            <li
              key={movie.imdbID}
              onClick={() => handleSelect(movie)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
            >
              {movie.Title}{" "}
              <span className="text-gray-500">({movie.Year})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
