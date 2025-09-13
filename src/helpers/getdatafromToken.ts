import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return null; // Return null if no token
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.id; // or decodedToken._id depending on your payload
  } catch (error: any) {
    console.error("Token verification error:", error.message);
    return null; // Return null instead of throwing
  }
};
