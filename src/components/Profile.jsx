import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeFeed, setFeed } from "./utils/feedSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.feed?.feed || []); // Default to an empty array
  const [currentCard, setCurrentCard] = useState(0);

  // Fetch user data from the server
  const fetchFeed = async () => {
    try {
      const { data } = await axios.get(BASE_URL+"/feed", { withCredentials: true });
      console.log(" data come from the api call"+data);
      dispatch(setFeed(data));

      console.log(data);
    } catch (e) {

      console.log(" error is coming beacuse of the erro is the coming ")
      console.error("Error fetching feed:", e?.message || "Unknown error");
    }
  };

  

  const handleAction = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
  
      dispatch(removeFeed(userId));
  
      console.log(res.data);
  
    } catch (error) {
      console.error("Error occurred while sending the request:", error);
      alert("An error occurred. Please try again.");
    }
  };
  


  useEffect(() => {
    fetchFeed();
  }, []);

 if(!userdata) return;
console.log(userdata);
if(userdata.length <=0) return  <p className=" text-4xl flex justify-center items-center min-h-screen bg-gray-900     text-white      font-bold     " >No More user Are Found!!!!!!!!!!!!!!!  </p>;

  return (


<div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-full max-w-md bg-gray-800 text-white shadow-xl rounded-lg p-6">
        {userdata?.map((card, index) => {
          if (index === currentCard) {
            return (
              <div key={card?.id || index} className="relative overflow-hidden rounded-lg">
                {/* Profile Image */}
                <img
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                  src={card?.photoUrl || "https://via.placeholder.com/400x400"}
                  alt={card?.firstName || "No name available"}
                />

                {/* User Information */}
                <div className="mt-4 text-center">
                  <h2 className="text-2xl font-bold">{card?.firstName || "Anonymous"}</h2>
                  <p className="text-sm text-gray-400 mt-1">
                    {card?.bio || "This is a default about of the user!"}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => handleAction("ignore", card._id)}
                    className="bg-pink-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-pink-600 transition"
                  >
                    Ignore
                  </button>
                  <button
                    onClick={() => handleAction("interested", card._id)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 transition"
                  >
                    Interested
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Profile;
