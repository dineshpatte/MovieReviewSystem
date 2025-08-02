import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "suer not found" }, { status: 400 });
    }

    //password verification

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "passowrd is not valid" },
        { status: 402 }
      );
    }

    //create the fuckin token

    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "login succesfull",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "unsuccessfull login" },
      { status: 400 }
    );
  }
}
