import React from "react";

import Link from "next/link";

const Moviecard = ({ movie }: any) => {
  return (
    <Link href={`/reviews/${movie.imdbId}`}>
      <div className="border rounded-md p-4 text-center shadow hover:shadow-lg cursor-pointer">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-64 object-cover mb-2"
        />
        <h2 className="font-bold">{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
};

export default Moviecard;
