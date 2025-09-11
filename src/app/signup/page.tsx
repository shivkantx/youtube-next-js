"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);

      toast.success("Signup successful!");
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);

      // ✅ better error message handling
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message;

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 text-black to-gray-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Show dynamic title here instead of duplicate h1 */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {loading ? "Processing..." : "Create an Account"}
        </h1>

        <div className="flex flex-col gap-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              placeholder="Enter username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full text-gray-500 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              placeholder="Enter email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-3 border text-gray-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              placeholder="Enter password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-3 text-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit button */}
          <button
            onClick={onSignUp}
            disabled={buttonDisabled || loading}
            className={`w-full font-semibold py-3 rounded-lg transition ${
              buttonDisabled || loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading
              ? "Signing Up..."
              : buttonDisabled
              ? "Please fill all the fields"
              : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
