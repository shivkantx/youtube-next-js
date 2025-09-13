"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="w-full max-w-md p-6 rounded-xl shadow-2xl bg-white transform transition duration-300 hover:scale-101 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <h1 className="text-3xl font-bold text-center mb-4">Verify Email</h1>

        <h2 className="p-2 bg-orange-500 text-white text-sm rounded mb-4 overflow-x-auto whitespace-nowrap">
          {token ? token : "No token found"}
        </h2>

        {verified && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-2 animate-bounce">
              ✅ Email Verified
            </h2>
            <Link
              href="/login"
              className="text-blue-600 underline hover:text-blue-800 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-red-600 animate-pulse">
              ❌ Verification Failed
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
