import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { combineSlices } from "@reduxjs/toolkit";

const EditProfile = () => {
  const info = useSelector((state) => state?.user?.profile);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch user profile
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile`, {
        withCredentials: true,
      });
      console.log(response.data);
      dispatch(profile(response.data));
      setFirstName(response.data.firstName || "");
      setLastName(response.data.lastName || "");
      setPhotoUrl(response.data.photoUrl || "");
      setAge(response.data.age || "");
      setGender(response.data.gender || "");
      setAbout(response.data.about || "");
    } catch (error) {
      navigate("/login");
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      console.log(response.data);
      fetchUser();
      
      navigate("/profile")
      
      // Refresh profile details after saving
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  // Loading state
  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="flex justify-center  pt-16 items-start min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      {/* Edit Profile Card */}
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Edit Profile
        </h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-yellow-300">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-gray-800 text-white rounded-md shadow-sm focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-yellow-300">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-gray-800 text-white rounded-md shadow-sm focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="photoUrl" className="block text-sm font-medium text-yellow-300">
              Photo URL
            </label>
            <input
              type="text"
              id="photoUrl"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-gray-800 text-white rounded-md shadow-sm focus:ring-yellow-500"
            />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-yellow-300">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-gray-800 text-white rounded-md shadow-sm focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-yellow-300">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-gray-800 text-white rounded-md shadow-sm focus:ring-yellow-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="about" className="block text-sm font-medium text-yellow-300">
              About
            </label>
            <textarea
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-500 bg-gray-800 text-white rounded-md shadow-sm focus:ring-yellow-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-gray-900 py-2 px-4 rounded-full hover:bg-yellow-600 transition"
          >
            Save Profile
          </button>
        </form>
      </div>

      <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full ml-6">
  <h2 className="text-3xl font-bold mb-6 text-center text-green-400 border-b-2 border-green-500 pb-2">
    Current Profile
  </h2>
  <div className="space-y-6">
    <div className="flex items-center space-x-4">
      <img
        src={photoUrl || "https://via.placeholder.com/100"}
        alt="Profile"
        className="rounded-full w-24 h-24 border-4 border-green-500 shadow-lg"
      />
      <div>
        <h3 className="text-lg font-semibold text-white">
          {firstName } {lastName || "Last Name"}
        </h3>
        <p className="text-sm italic text-gray-400">{about || "About Me"}</p>
      </div>
    </div>
    <div className="bg-gray-800 p-4 rounded-md shadow-inner space-y-2">
      <p className="flex items-center text-white">
        <span className="text-green-400 font-semibold mr-2">Age:</span>{" "}
        {age || "N/A"}
      </p>
      <p className="flex items-center text-white">
        <span className="text-green-400 font-semibold mr-2">Gender:</span>{" "}
        {gender || "N/A"}
      </p>
      <p className="flex items-center text-white">
        <span className="text-green-400 font-semibold mr-2">About:</span>{" "}
        {about || "N/A"}
      </p>
    </div>
    <div className="text-center">
      <button
        className="bg-green-500 hover:bg-green-600 text-gray-900 py-2 px-6 rounded-full font-semibold transition transform hover:scale-105 shadow-md"
      >
        View Full Profile
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default EditProfile;
