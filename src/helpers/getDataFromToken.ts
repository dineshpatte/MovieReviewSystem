import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { error } from "console";

export const getDataFromToken = (request: NextRequest) => {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Token is not found");
  }

  try {
    const decodedToken: any = jwt.verify(token, process.env.SECRET_TOKEN!);

    if (!decodedToken.id && !decodedToken._id) {
      throw new Error("Invalid token payload");
    }

    return decodedToken.id || decodedToken._id;
  } catch (error: any) {
    console.error(error.message);
  }
};
