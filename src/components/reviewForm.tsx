"use client";
import React, { useState } from "react";
import axios from "axios";

interface reviewFormProps {
  movieId: string;
  title: string;
  Poster: string;
  userId: string;
}

const reviewForm = ({ movieId, title, Poster, userId }: reviewFormProps) => {
  const [review, setReview] = useState("");
  const submitReview = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/review", {
        review,
        movieId,
        title,
        Poster,
        userId,
      });
      console.log(response.data.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <label htmlFor="review form">Review</label>
      <form onSubmit={submitReview}>
        <textarea
          placeholder="write your review"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
          }}
        ></textarea>
        <button className="px-4 py-2 mt-4">submit</button>
      </form>
    </div>
  );
};

export default reviewForm;
