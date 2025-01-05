import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErr("");

    if (!firstName || !lastName || !emailId || !password || !gender) {
      setErr("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:7777/signup", // Your sign-up API endpoint
        { firstName, lastName, emailId, password, gender },
        { withCredentials: true }
      );



      navigate("/editprofile"); 
    } catch (err) {
      setErr(err.response?.data?.message || "An error occurred during sign-up");
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

      {/* Sign Up Container */}
      <div className="relative bg-gradient-to-b from-gray-800 to-black bg-opacity-90 p-8 rounded-xl shadow-xl max-w-md w-full z-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          Create an Account
        </h2>

        {/* Sign Up Form */}
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div>
            <p className="text-red-500 text-sm">{err}</p>

            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-300"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-gray-900 text-white"
              placeholder="Enter your first name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-300"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-gray-900 text-white"
              placeholder="Enter your last name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={emailId}
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

          {/* Gender Dropdown */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-300"
            >
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm bg-gray-900 text-white"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 px-4 rounded-full font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Social Sign Up */}
        <div className="mt-6">
          <button className="w-full bg-red-500 text-white py-3 px-4 rounded-full font-semibold hover:bg-red-600 transition">
            Sign Up with Google
          </button>
        </div>

        {/* Already have an account */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-pink-500 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>

        {/* Terms and Privacy */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            By signing up, you agree to our{" "}
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

export default SignUp;
