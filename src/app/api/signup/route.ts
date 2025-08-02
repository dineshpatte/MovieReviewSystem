import { existsSync } from "fs";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/user.model";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbconfig/dbconfig";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();

    const { name, email, password } = reqBody;

    if (!(name || email || password)) {
      return NextResponse.json({ message: "not all details have come" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ message: "user is already exist" });
    }

    //hash password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      { message: " user is created", savedUser },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
