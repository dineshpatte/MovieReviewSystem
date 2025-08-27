import { NextRequest, NextResponse } from "next/server";
import { Favourite } from "@/models/favourite.model";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import jwt from "jsonwebtoken";
import { User } from "@/models/user.model";
import { connect } from "@/dbconfig/dbconfig";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const { movieId, title, poster, year } = await request.json();
    if (!(movieId || !title || poster || year)) {
      return NextResponse.json(
        { message: "data insufficiency" },
        { status: 500 }
      );
    }

    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "the token is invalid or please login" },
        { status: 500 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: "user id is invalid or use not found" },
        { status: 501 }
      );
    }

    const newFavoutite = new Favourite({
      userId,
      movieId,
      poster,
      year,
      title,
    });

    await newFavoutite.save();

    return NextResponse.json(
      { message: "favourite created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error.message);

    return NextResponse.json(
      { message: "cannot post into favourites" },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);

    const favourites = await Favourite.find({ userId });

    if (!favourites) {
      return NextResponse.json(
        {
          message: "favourites are not found may be userid is wrong chcek",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ favourites }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch favourites" },
      { status: 400 }
    );
  }
}
