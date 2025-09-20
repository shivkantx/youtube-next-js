"use client";

import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function HomePage() {
  const router = useRouter();
  const [user, setUser] = React.useState<any>(null);

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

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUser(res.data.data); // full user object { _id, username, email }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-900">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-blue-700">MyApp</div>
          <button
            onClick={logout}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Welcome to MyApp 🎉
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-blue-100">
          A simple, fast, and reliable dashboard to manage your account and
          explore features with ease.
        </p>
      </header>

      {/* Main Section */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 space-y-10">
        {/* User Info Card */}
        <div className="bg-white shadow-xl rounded-xl p-8 text-center border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Your Account</h2>

          {!user ? (
            <p className="text-gray-600">No user data available</p>
          ) : (
            <div className="space-y-3">
              <p className="text-lg font-bold text-gray-800">
                Username: {user.username}
              </p>
              <p className="text-lg text-gray-700">Email: {user.email}</p>
              <Link
                href={`/profile/${user._id}`}
                className="block text-blue-600 underline hover:text-blue-800 transition"
              >
                User ID: {user._id}
              </Link>
            </div>
          )}

          <p className="mt-3 text-gray-500">
            Keep your account secure and explore more options.
          </p>

          <button
            onClick={getUserDetails}
            className="mt-6 px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Get User Details
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          <Link
            href={`/profile/${user?._id || ""}`}
            className="p-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-blue-800">Profile</h3>
            <p className="text-sm text-blue-700 mt-2">
              View and edit your profile.
            </p>
          </Link>
          <Link
            href="#"
            className="p-6 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-purple-800">Settings</h3>
            <p className="text-sm text-purple-700 mt-2">
              Manage your preferences.
            </p>
          </Link>
          <Link
            href="#"
            className="p-6 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-pink-800">Help</h3>
            <p className="text-sm text-pink-700 mt-2">
              Get assistance and FAQs.
            </p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 text-center text-sm text-gray-500">
        ©shivkant {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;
