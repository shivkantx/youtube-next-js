"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message || "Logout failed");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
        <hr className="my-4 border-gray-300" />
        <p className="text-gray-600 mb-6">Welcome to your profile page</p>
        <button
          onClick={logout}
          className="w-full py-3 bg-blue-600 font-semibold text-white rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
