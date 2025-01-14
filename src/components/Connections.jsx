import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useEffect } from "react";
import { setConnections } from "./utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import TinderCard from "react-tinder-card";

const Connections = () => {
  const dispatch = useDispatch();

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

  const connections = useSelector((state) => state?.connections?.connections);

  useEffect(() => {
    fetchData();
  }, []);

  if (!connections) return null;

  const swiped = (direction, nameToDelete) => {
    console.log("Removing: " + nameToDelete);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-10">
      <h1 className="text-center text-3xl font-bold mb-10">
        Swipe Through Connections
      </h1>
      <div className="flex justify-center items-center h-[70vh]">
        <div className="relative w-full max-w-md h-full">
          {connections.map((connection) => (
            <TinderCard
              key={connection._id}
              className="absolute w-full h-full"
              onSwipe={(dir) => swiped(dir, connection.firstName)}
              onCardLeftScreen={() => outOfFrame(connection.firstName)}
            >
              <div
                className="relative w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-5 rounded-lg shadow-lg"
                style={{
                  backgroundImage: `url(${connection.photoUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute bottom-0 bg-black bg-opacity-60 w-full p-4 rounded-b-lg text-center text-white">
                  <h2 className="text-xl font-semibold">
                    {connection.firstName} {connection.lastName}
                  </h2>
                  <p>
                    {connection.age} years old | {connection.gender}
                  </p>
                  <h3 className="text-lg font-semibold mt-2">Skills:</h3>
                  <div className="flex flex-wrap justify-center gap-2 mt-1">
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
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
