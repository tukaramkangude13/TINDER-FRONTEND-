import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import  Connections  from "./Connections";
import Request from "./Request";
import SignUp from "./SignUp";
import axios from "axios";
import { BASE_URL } from "./utils/constant";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Messages from "./Message";
export function Body() {
  const userdata=useSelector((state)=>state.user.user);

// const   navigate=useNavigate();
//   const fetchUser = async () => {
//     try {




//       if(userdata){
//         console.log("user already logged in")
//         return;
//       }
//       console.log(" api call made ")
//       const response = await axios.get(BASE_URL + "/profile", {
//         withCredentials: true,
    
//       });

//       console.log(response.data);
//       navigate("/profile")
//     } catch (error) {
//       navigate("/login")
//       console.log(error);
//     }
//   };

//   useEffect(()=>{
// fetchUser();
  // },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> 
          <Route path="login" element={<Login />} />
        <Route path="/signup"  element={<SignUp/>} />
        
          <Route path="profile" element={<Profile />} />
        <Route  path="/message"  element={<Messages/>}  />
        <Route path="/editprofile" element={<EditProfile/>}  />

<Route  path="/connections"  element={<Connections/>}  />
<Route path="/request"  element={<Request/>}   />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
