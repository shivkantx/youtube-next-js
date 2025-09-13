import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    console.log("Raw token from request:", token);

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // 🔑 Hash the raw token before lookup
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verifyToken: hashedToken,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // ✅ Verify user
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    console.error("Verification error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
