import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import { Review } from "@/models/review.model";
import { User } from "@/models/user.model";
import Jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();

    const userId = getDataFromToken(request);

    if (!userId) {
      return NextResponse.json(
        { message: "user not found or user didnt login" },
        { status: 400 }
      );
    }

    const reviews = await Review.find({ userId }).populate("movieId", "name");
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
    const movieId = params.id;

    const { title, poster, content } = await req.json();

    console.log("POST body:", { movieId, title, poster, content });

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token)
      return NextResponse.json({ message: "No token" }, { status: 401 });

    const decoded: any = Jwt.verify(token, process.env.SECRET_TOKEN!);
    const userId = decoded.id;

    console.log("user:", userId);

    if (!movieId || !title || !poster || !content) {
      return NextResponse.json(
        { message: "Please provide all details" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    }

    const newReview = new Review({
      userId,
      movieId: params.id,
      title,
      poster,
      content,
    });
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
