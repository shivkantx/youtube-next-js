"use client";
import React, { useEffect, useState } from "react";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

function UserProfile({ params }: UserProfileProps) {
  const [id, setId] = useState<string>("");

  useEffect(() => {
    // unwrap the promise
    params.then((p) => setId(p.id));
  }, [params]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        <hr className="w-24 border-gray-300 mb-4" />

        <p className="text-lg text-gray-600 text-center">
          Welcome to your profile page!
        </p>

        <div className="px-8 bg-amber-500 p-2 py-4 rounded-xl text-gray-600 font-semibold text-center text-lg w-full">
          User ID: {id || "Loading..."}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
