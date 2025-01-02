"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { FaEye, FaGoogle } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    } else {
      window.location.href = "/dashboard";
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* Left Section */}
      <div className="flex flex-col justify-center w-1/2 h-full bg-blue-600 text-white p-10">
        <div>
          <div className="flex items-center mb-4">
            {/* <img
              src="/path-to-your-logo.png"
              alt="SaleSkip Logo"
              className="w-10 h-10 mr-3"
            /> */}
            <h1 className="text-4xl font-bold">Hello SaleSkip! 👋</h1>
          </div>
          <p className="text-lg mb-6">
            Skip repetitive and manual sales-marketing tasks. Get highly
            productive through automation and save tons of time!
          </p>
          <p className="text-sm">
            {" "}
            &copy; {new Date().getFullYear()} SaleSkip. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center w-1/2 h-full bg-white p-10">
        <img
          src="/path-to-your-logo.png"
          alt="SaleSkip Logo"
          className="w-10 h-10 mr-3"
        />
        <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-sm mb-6">
          Don&apos;t have an account?{" "}
          <a href="#" className="text-blue-500 font-medium">
            Create a new account now
          </a>
          , it&apos;s FREE! Takes less than a minute.
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              placeholder="hisaalim.ux@gmail.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <FaEye className="w-5 h-5" />
                ) : (
                  <FaEyeSlash className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white rounded-lg"
            style={{
              background: "linear-gradient(90deg, #8e44ad 0%, #f80759 100%)",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login Now"}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">OR</div>

          <button
            type="button"
            className="w-full py-2 border rounded-lg flex items-center justify-center space-x-2"
          >
            <FaGoogle />
            <span>Login with Google</span>
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} SaleSkip. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
