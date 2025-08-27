import mongoose from "mongoose";
import { ref } from "process";

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
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
  year: {
    type: Date,
    default: Date.now,
  },
});

export const Favourite =
  mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema);
