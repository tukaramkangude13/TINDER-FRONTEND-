import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/constant";

const Request = () => {
  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/recived", {
        withCredentials: true,
      });
      setRequests(response.data);
      console.log(response);
      // Update state with received data
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };
console.log(requests);
  const handleAction = async (requestId, status) => {
    try {
      const send = await axios.post(BASE_URL + "/request/review/" + status + "/" + requestId,

        {},
        { withCredentials: true }
      );
      console.log(send);
    } catch (error) {
      console.error("Error handling action:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b  pt-16 from-gray-900 via-black to-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Received Requests</h1>
      <div className="flex flex-wrap justify-center gap-6">
        {requests.map((request) => (
          <div
            key={request._id}
            className="w-full sm:w-96 bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center"
          >
            <img
              src={request.fromUserId.photoUrl||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD116U9ZCk8bEaanCeB5rSCC2uqY5Ka_2_EA&s"}
              alt={`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
              className="w-24 h-24 rounded-full"
            />
            <h2 className="text-xl font-semibold mt-4">
              {request.fromUserId.firstName} {request.fromUserId.lastName}
            </h2>
            <p className="text-gray-400">
              {request.fromUserId.gender}, Age: {request.fromUserId.age}
            </p>
            <div className="mt-4 w-full">
              <h3 className="text-sm font-semibold text-gray-300 mb-2">
                Skills:
              </h3>
              <ul className="flex flex-wrap gap-2 justify-center">
                {request.fromUserId.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="text-xs bg-blue-700 text-white py-1 px-3 rounded-lg"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between w-full mt-6">
              <button
                onClick={() => handleAction(request._id, "accepted")}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg w-1/3"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(request._id, "rejected")}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg w-1/3"
              >
                Reject
              </button>
              {/* <button
                onClick={() => handleAction(request._id, "add")}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg w-1/3"
              >
                Add
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
