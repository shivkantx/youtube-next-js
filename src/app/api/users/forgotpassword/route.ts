import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token and expiry in user document
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Send reset email
    const resetLink = `${process.env.DOMAIN}/auth/reset-password?token=${resetToken}`;
    await sendEmail({ email, emailtype: "RESET", userId: user._id.toString() });

    return NextResponse.json({ message: "Password reset email sent" });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
