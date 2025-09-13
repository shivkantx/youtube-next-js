"use client";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

function HomePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");

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
      console.log(res.data); // {message : "User found", data: {_id : "643b8f0e4f1c2b001c8e4d3a", name: "John Doe", email: "john.doe@example.com"  }}

      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  React.useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">MyApp</div>
          <button
            onClick={logout}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to MyApp</h1>

        <h2 className="text-2xl text-gray-700 bg-gray-100 p-3 rounded-md">
          {data === "nothing" ? (
            "No user data available"
          ) : (
            <Link
              href={`/profile/${data}`}
              className="underline hover:text-blue-600"
            >
              {data}
            </Link>
          )}
        </h2>

        <p className="text-gray-600 max-w-xl">
          Simple, fast, and reliable dashboard for all your needs.
        </p>

        <p className="text-gray-500">Your user ID: {data}</p>

        <button
          onClick={getUserDetails}
          className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          Get User Details
        </button>
      </main>
    </div>
  );
}

export default HomePage;
