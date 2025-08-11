"use client";
import axios from "axios";

import React from "react";
import { Search } from "lucide-react";

interface searchBarProps {
  movieName: string;
  setMovieName: (name: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ movieName, setMovieName, onSearch }: searchBarProps) => {
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
    </div>
  );
};

export default SearchBar;
