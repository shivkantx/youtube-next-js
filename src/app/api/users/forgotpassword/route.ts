import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      // send reset email only if user exists
      await sendEmail({ email, emailtype: "RESET", userId: user._id });
    }

    // always return same response (for security)
    return NextResponse.json({
      message: "If that email exists, a reset link has been sent",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
