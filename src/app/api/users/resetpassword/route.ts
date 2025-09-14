import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

connect();

export async function POST(request: NextRequest) {
  try {
    // Extract token & new password from request body.
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    // Hash token (since you stored hashedToken in DB)
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with forgotPasswordToken and check expiry.
    const user = await User.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update user password & clear reset token fields
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    // Respond with success.
    return NextResponse.json({
      message: "Password reset successful",
      success: true,
    });
  } catch (error: any) {
    console.error("Reset password error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
