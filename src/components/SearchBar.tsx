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
    <div className="fixed top-0 left-0">
      <input
        type="text"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)}
        placeholder="Search movies..."
        className="border px-3 py-2 rounded-md mr-2 w-64"
      />
      <button onClick={onSearch}>Search</button>

      {suggestions.length > 0 &&
        suggestions.map((movie): any => (
          <ul
            className="absolute bg-white text-black border rounded-md w-full mt-1 max-h-60 overflow-y-auto shadow"
            onClick={onSearch}
          >
            <li
              key={movie.imdbID}
              onClick={() => handleSelect(movie)}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {movie.Title} ({movie.Year})
            </li>
          </ul>
        ))}
    </div>
  );
};

export default SearchBar;
