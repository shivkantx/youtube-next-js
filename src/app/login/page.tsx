"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState(""); // inline error message

  const onLogin = async () => {
    try {
      setLoading(true);
      setErrorMsg(""); // reset any previous error
      const response = await axios.post("/api/users/login", user);

      console.log("Login success", response.data);
      toast.success(response.data.message || "Login successful");

      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.response?.data || error.message);
      const msg = error.response?.data?.message || "Login failed";
      toast.error(msg);
      setErrorMsg(msg); // also show inline
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {loading ? "Logging in..." : "Login"}
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-5">
          {/* Email input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              placeholder="you@example.com"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              placeholder="••••••••"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Inline error */}
          {errorMsg && (
            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
          )}

          {/* Login button */}
          <button
            onClick={onLogin}
            disabled={buttonDisabled || loading}
            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
              buttonDisabled || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-2">
            <span className="w-1/5 border-b border-gray-300"></span>
            <span className="px-2 text-gray-400 text-sm">or</span>
            <span className="w-1/5 border-b border-gray-300"></span>
          </div>

          {/* Links */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-center text-sm text-gray-600">
            Forgot your password?{" "}
            <Link
              href="/auth/forgot-password"
              className="text-blue-600 font-medium hover:underline"
            >
              Reset it
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
