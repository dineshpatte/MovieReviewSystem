"use client";
import React, { useState } from "react";
import axios from "axios";

interface reviewFormProps {
  movieId: string;
  title: string;
  poster: string;
}

const reviewForm = ({ movieId, title, poster }: reviewFormProps) => {
  const [review, setReview] = useState("");
  const submitReview = async (e: React.FormEvent) => {
    const token: any = localStorage.getItem("token");

    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/review/${movieId}`,
        {
          title,
          poster,
          content: review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Review submitted:", response.data);
    } catch (error: any) {
      console.error("Error submitting review:", error.message);
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
