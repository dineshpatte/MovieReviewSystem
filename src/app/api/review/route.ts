import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { Review } from "@/models/review.model";
import { User } from "@/models/user.model";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();

    const { userId, movieId, title, poster, content } = reqBody;

    if (!(userId || movieId || title || poster || content)) {
      return NextResponse.json({ message: "please provide all the details" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "user is not valid" },
        { status: 500 }
      );
    }

    const newReview = new Review({ userId, movieId, title, poster, content });

    const savedUser = await newReview.save();

    return NextResponse.json(
      {
        message: "new review is created",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}

export async function GET(request: NextRequest) {
  await connect();
  const reqBody = await request.json();

  const { movieId } = reqBody;

  if (!movieId) {
    return NextResponse.json({ message: "review not found" }, { status: 400 });
  }

  const newReview = await Review.findById(movieId).populate("userId", "name");

  return NextResponse.json(
    { message: "review fetched", newReview },
    { status: 201 }
  );
}
