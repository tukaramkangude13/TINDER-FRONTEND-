import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, profile } from "./utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = React.useState("nidhi@123");
  const [email, setEmail] = React.useState("nidhi.agarwal@example.com");
  const dispatch = useDispatch();
  const navigate = useNavigate();
const[err,seterr]=useState("");
  const handleLogin = async (e) => {
    seterr("");
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        { emailId: email, password },
        { withCredentials: true }
      );

      console.log(res.data.user);
      dispatch(login(res.data.user))

      ;
       dispatch(profile(res.data))
       console.log(res.data);
      navigate("/editprofile");
    } catch (err) {
      seterr(err.response.data.message)

      console.error(err.response);

    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900"
      style={{
        backgroundImage:
          "url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black opacity-50"></div>
      {/* Login Container */}
      <div className="relative bg-gradient-to-b from-gray-800 to-black bg-opacity-90 p-8 rounded-xl shadow-xl max-w-md w-full z-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          Log in to Tinder
        </h2>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleLogin}>

          <div>

          <p className=" text-red-500 text-sm">{err}</p>

            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-gray-900 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-gray-900 text-white"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-4 rounded-full font-semibold hover:opacity-90 transition"
          >
            Log in
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-6">
       <Link to="/signup"  >     <button className="w-full bg-red-500 text-white py-3 px-4 rounded-full font-semibold hover:bg-red-600 transition">
            Log in with Google
          </button>  </Link>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            By logging in, you agree to our{" "}
            <a href="#" className="text-pink-500 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-pink-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
