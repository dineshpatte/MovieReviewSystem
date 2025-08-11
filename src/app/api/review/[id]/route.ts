import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { Review } from "@/models/review.model";
import { User } from "@/models/user.model";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const movieId = (await params).id;

    if (!movieId) {
      return NextResponse.json(
        { message: "Movie ID is required" },
        { status: 400 }
      );
    }

    const reviews = await Review.find({ movieId }).populate("userId", "name");
    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const { id: movieId } = params;
    const { userId, title, poster, content } = await req.json();

    if (!userId || !movieId || !title || !poster || !content) {
      return NextResponse.json(
        { message: "Please provide all details" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }

    const newReview = new Review({ userId, movieId, title, poster, content });
    await newReview.save();

    return NextResponse.json({ message: "Review created" }, { status: 201 });
  } catch (error: any) {
    console.error("POST review error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
