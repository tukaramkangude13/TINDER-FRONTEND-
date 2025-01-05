import React, { useEffect, useState, useRef, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faSearch,
  faEllipsisVertical,
  faWalkieTalkie,
  faStopwatch,
  faClock,
  faCheck,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setConnections } from "./utils/connectionSlice";

import axios from "axios";
import { io } from "socket.io-client";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { use } from "react";

const BASE_URL = "http://localhost:7777";
const socket = io(BASE_URL);

const Messages = () => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("bye");
  const [message, setmessage] = useState(false);
  const [reply, setReply] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const [date,setdate]=useState("2025-01-03T19:25:18.184Z");
  const messagesEndRef = useRef(null);
  const[status,setstatus]=useState(faCheckDouble);
  const typingTimeoutRef = useRef(null);
  const dispatch=useDispatch();
console.log("2025-01-04T19:25:18.184Z">"2025-01-03T19:25:18.184Z")
  const connections = useSelector((state) => state?.connections?.connections);
  const userdata = useSelector((state) => state?.user?.profile?._id);

  useEffect(() => {
    if(userdata){
    getMessages();
    }
  
  
  }, [index]);




useEffect(()=>{
  
  fetchData();
},[]);
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
  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      console.log(newMessage);
      if (
        (newMessage.fromUserId === userdata &&
          newMessage.toUserId === connections[index]?._id) ||
        (newMessage.toUserId === userdata &&
          newMessage.fromUserId === connections[index]?._id)
      ) {
        setReply((prev) => [...prev, newMessage]);
      } console.log(" i am aslo come here ");
    
    });
socket.on("user_typing", ({ fromUserId }) => {
      console.log(" typinf function socket is called ");
      console.log(fromUserId);
      console.log(connections[index]?._id);
      if (fromUserId === connections[index]?._id) setTyping(true);
    });
   

    socket.on("stop", (fromUserId) => {
      console.log("+++++++++++ yses i here with the is =",fromUserId);

      if (fromUserId === connections[index]?._id) setTyping(false);
    });

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, [index, userdata,connections]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [reply]);

  const getMessages = async () => {
    if (!connections || !connections[index]) return;
    setmessage(true);

    console.log(connections[index]._id);
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/get/${connections[index]._id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setReply(response.data.latestMessage || []);
    } catch (error) {
      setmessage(false);
      setReply([]);
      console.error("Failed to load messages:", error);
      //   alert("Unable to fetch messages.");
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    setTyping(false);
    if (!connections[index]?._id || !text.trim()) return;

    const messageData = {
      fromUserId: userdata,
      toUserId: connections[index]._id,
      message: text,
      

    };

    socket.emit("send_message", messageData);
    setSending(true);
    try {
      //   const response = await axios.post(
      //     `${BASE_URL}/send`,
      //     { toUserId: connections[index]._id, message: text },
      //     { withCredentials: true }
      //   );
      //   setReply((prev) => [...prev, response.data.data]);
      //   setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
      //   alert("Failed to send the message.");
    } finally {
      setSending(false);
    }
  };
  console.log(typing);

  const handleTyping = useCallback(() => {
    socket.emit("typing", {
      fromUserId: userdata,
      toUserId: connections[index]?._id,
    });

    // Clear previous timeout and reset typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        fromUserId: userdata,
        toUserId: connections[index]?._id,
      },
    // setTyping(false);
    );
    }, 3000);
  }, [index, userdata, connections]);
const gettime=(time)=>{
  const timestamp = time;
  const date = new Date(timestamp);
  
  // Convert to local time
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const localTime = date.toLocaleTimeString("en-US", options);
  
 return localTime;

}


  if (!connections) return <p> loading..... </p>;
  if (!userdata) return
  (
    
    <p> loading......</p> 


  ) 
  
  return (
    <div className="flex h-screen bg-[#10171e]">
    {/* Sidebar */}
    <div className="w-1/4   bg-[#0d1418] pt-14 overflow-y-scroll text-white p-4 border-r border-gray-800">
      <h2 className="text-2xl font-bold mb-4">Chats</h2>
      <div className="space-y-4">
        {connections.map((connection, idx) => (
          <div
            key={connection._id}
            className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              index === idx ? "bg-gray-800" : "hover:bg-gray-700"
            }`}
            onClick={() => setIndex(idx)}
          >
            <img
              src={connection.photoUrl}
              alt={`${connection.firstName}`}
              className="w-12 h-12 rounded-full object-cover border border-gray-600"
            />
            <div>
              <h3 className="text-lg font-semibold">{connection.firstName} {connection.lastName}</h3>
              <p className="text-sm text-gray-400 truncate">
                {connection.lastMessage || "No messages yet"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  
    {/* Chat Section */}
    <div className="flex-1 flex pt-20 flex-col relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <img
            src={connections[index]?.photoUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full border border-gray-600"
          />
          <div>
            <h3 className="text-lg  text-gray-100 font-semibold">{connections[index]?.firstName}</h3>
            <p className="text-sm text-gray-400">{typing ? "Typing..." : "Online"}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FontAwesomeIcon icon={faVideo} className="text-white text-lg cursor-pointer" />
          <FontAwesomeIcon icon={faSearch} className="text-white text-lg cursor-pointer" />
          <FontAwesomeIcon icon={faEllipsisVertical} className="text-white text-lg cursor-pointer" />
        </div>
      </div>
  
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#10171e]">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : (
          <>
            {reply.length > 0 ? (
              reply.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.fromUserId === userdata ? "justify-end" : "justify-start"} my-2`}>
                  <div
                    className={`p-3 rounded-lg max-w-xs relative ${
                      msg.fromUserId === userdata
                        ? "bg-[#156038] text-white rounded-br-none"
                        : "bg-[#20272b] text-white rounded-bl-none"
                    } shadow-lg`}
                  >
                   <div  className=" w-full     flex flex-col"  >
                   <p className="mb-1">{msg.message}</p>
                   <div className=" flex      "> <span className="text-xs absolute bottom-1 right-2 text-gray-300">
                      {gettime(msg.updatedAt)} 
                    </span>
                    
                   {msg.fromUserId === userdata  && <p> <FontAwesomeIcon  className={`   ${status===faCheckDouble ?   '  text-[] ' :''   }`} icon={status  } /></p>}
                    </div>
                   
                   </div>
                   
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">No chat between both of you.</p>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
  
      {/* Input */}
      <div className="p-4 bg-gray-900 flex items-center space-x-4 border-t border-gray-800">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
          className="flex-1 p-3 bg-gray-800 rounded-full text-sm text-white focus:outline-none placeholder-gray-500"
        />
        <button
          onClick={() => {
            send();
            setText("");
          }}
          disabled={sending}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all duration-200 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default Messages;
