import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({
  email,
  emailtype,
  userId,
}: {
  email: string;
  emailtype: "VERIFY" | "RESET";
  userId: string;
}) => {
  try {
    // Generate a raw token
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    if (emailtype === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailtype === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: "shivkant639624@gmail.com",
      to: email,
      subject:
        emailtype === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
    <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${rawToken}">
      here</a> to ${
        emailtype === "VERIFY" ? "verify your email" : "reset your password"
      }.</p>
    <p>If the above link doesn't work, copy and paste this into your browser:</p>
    <p>${process.env.DOMAIN}/verifyemail?token=${rawToken}</p>
    <p>This link will expire in 1 hour.</p>
  `,
    };

    // Send mail
    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
