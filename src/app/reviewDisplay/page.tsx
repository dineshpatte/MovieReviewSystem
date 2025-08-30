"use client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import { useState, useEffect } from "react";

const page = () => {
  const [reviews, setReviews] = useState<any>([]);
  const [userId, setuserId] = useState<any>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setuserId(decoded.id);
      } catch (error) {
        console.log(error);
      }
    }

    fetchReviews();
  }, [userId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`/api/review/${userId}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {reviews.map((r: any) => (
        <div key={r._id}>
          <h3>{r.title}</h3>
          <p>{r.content}</p>
          <img src={r.poster} alt="" />
        </div>
      ))}
    </div>
  );
};

export default page;
