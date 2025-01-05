import React, { useEffect } from "react";
import Language from "./Language";
import { BASE_URL } from "./utils/constant";
import axios from "axios";
import { logout } from "./utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const [ShowMultilanguage, setShowMultilanguage] = React.useState(false);
  const navigate = useNavigate();
  const  dispatch  =useDispatch();
    const data = useSelector((state) => state?.user?.user);
useEffect(()=>{

},[data]);
    const handleLogout = async () => {
    try {
      const response = await axios.post(BASE_URL + "/logout", {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex justify-between items-center p-4 bg-transparent">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black"></div>

      {/* Left Section */}
      <div className="flex z-40 items-center space-x-4">
        {/* Logo */}
        <svg
          className="w-20 text-white ml-2 md:w-24"
          viewBox="0 0 519 123"
          aria-hidden="true"
        >
          <title>Tinder</title>
          <g fill="currentcolor">
            <path
              d="M31.5 49.6C55 41.5 59 20.4 56 1c0-.7.6-1.2 1.2-1C79.7 11 105 35 105 71c0 27.6-21.4 52-52.5 52a50 50 0 0 1-28.2-92.7c.6-.4 1.4 0 1.4.7.3 3.7 1.3 13 5.4 18.6h.4z"
              fill="white"
            ></path>
            {/* Add other SVG paths */}
          </g>
        </svg>
        {/* Navigation */}
        <nav className="hidden md:flex space-x-4">
          <button className="text-white hover:text-[#ff4458] hover:underline">Products</button>
          <button className="text-white hover:text-[#ff4458] hover:underline">Learn</button>
     <Link  to="/message"><button className="text-white hover:text-[#ff4458] hover:underline">Messages</button></Link>     

<Link  to="/request" >           <button className="text-white hover:text-[#ff4458] hover:underline">Request</button>
</Link>        <Link  to="/editprofile"><button className="text-white hover:text-[#ff4458] hover:underline">EditProfile</button></Link>  
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex z-40 items-center space-x-4">
        <button
          onClick={() => setShowMultilanguage(!ShowMultilanguage)}
          className="text-white hover:text-[#ff4458] hover:underline"
        >
          Language
        </button>

        {ShowMultilanguage && (
          <Language
            ShowMultilanguage={ShowMultilanguage}
            setShowMultilanguage={setShowMultilanguage}
          />
        )}

        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-white text-black px-4 py-2 rounded-full"
        >
          Log In
        </button>
        <button
          onClick={handleLogout}
          className="bg-white text-black px-4 py-2 rounded-full"
        >
          LogOut
        </button>
        {data && (
       <Link  to="/connections" >    <img
            src={data?.user?.photoUrl || data?.photoUrl}
            className="rounded-full w-8 h-10  md:w-10"
            alt="user image"
          /></Link>
        )}
      </div>
    </div>
  );
};

export default Header;
