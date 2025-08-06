import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { Review } from "@/models/review.model";
import { User } from "@/models/user.model";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { userId, movieId, title, poster } = reqBody;

    if (!(userId || movieId || title || poster)) {
      return NextResponse.json({ message: "please provide all the details" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { message: "user is not valid" },
        { status: 500 }
      );
    }

    const newReview = new Review({ userId, movieId, title, poster });

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
