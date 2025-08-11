"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import ReviewForm from "@/components/reviewForm";
import ReviewList from "@/components/reviewList";
import Moviecard from "@/components/Moviecard";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [movie, setMovie] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [movieName, setMovieName] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/`, {
          params: {
            i: id,
            apikey: process.env.NEXT_PUBLIC_OMDB_KEY,
            plot: "full",
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/review/${id}`);
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchMovie();
    fetchReviews();
  }, [id]);

  const onSearch = async () => {
    try {
      if (!movieName.trim()) return;
      const res = await axios.get(`https://www.omdbapi.com/`, {
        params: {
          s: movieName,
          apikey: process.env.NEXT_PUBLIC_OMDB_KEY,
        },
      });

      if (res.data.Search?.length > 0) {
        router.push(`/reviews/${res.data.Search[0].imdbID}`);
      }
    } catch (error) {
      console.error("Error searching movie:", error);
    }
  };

  if (!movie) {
    return <p className="p-6 text-white">Loading movie details...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <SearchBar
        movieName={movieName}
        setMovieName={setMovieName}
        onSearch={onSearch}
      />

      <div className="mt-20 w-full max-w-4xl">
        <Moviecard movie={movie} />
        <p className="mt-4">{movie.Plot}</p>
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <ReviewList reviews={reviews} />
      </div>

      <div className="mt-8 w-full max-w-4xl">
        <ReviewForm
          movieId={id}
          title={movie.Title}
          Poster={movie.Poster}
          userId="123"
        />
      </div>
    </div>
  );
};

export default Page;
