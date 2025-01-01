import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { BASE_URL } from "./utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./utils/userSlice";

function App() {
  const userdata=useSelector((state)=>state.user.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const fetchUser = async () => {
    try {
      if(userdata){
        console.log("user already logged in")
        return;
      }
      console.log(" api call made ")
      const response = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
    
      });

    dispatch(login(response))
      console.log(response.data);
      navigate("/profile")
    } catch (error) {
      navigate("/login")
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {/* Header positioned at the top */}
      <Header />
      <Outlet />
    </div>
  );
}

export default App;