import mongoose from "mongoose";
import { ref } from "process";

const reviewSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    default: Date.now,
  },
});

export const Review =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);
