import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useEffect, useState } from "react";
import { setConnections } from "./utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
const Connections = () => {
//   const [connections, setConnections] = useState([]);

const dispatch=useDispatch();
  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections/recived", {
        withCredentials: true,
      });
  dispatch(setConnections(response.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  const connections=useSelector((state)=>state?.connections?.connections)
  console.log(connections);
  useEffect(() => {
    fetchData();
  }, []);
if(!connections) return;
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-10">
      <h1 className="text-center text-3xl font-bold mb-10">
        Your Connections
      </h1>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={connection.photoUrl}
              alt={`${connection.firstName} ${connection.lastName}`}
              className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-md"
            />
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold">
                {connection.firstName} {connection.lastName}
              </h2>
              <p className="text-gray-300">
                {connection.age} years old | {connection.gender}
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Skills:</h3>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {connection.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
