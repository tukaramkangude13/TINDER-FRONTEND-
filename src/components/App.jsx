import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { BASE_URL } from "./utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./utils/userSlice";
import { profile } from "./utils/userSlice";
import { setConnections } from "./utils/connectionSlice";
function App() {
  const userdata = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const responsed = await axios.get(
        BASE_URL + "/user/connections/recived",
        {
          withCredentials: true,
        }
      );
      dispatch(setConnections(responsed.data));

      if (userdata) {
        console.log("User already logged in");
        return navigate("/profile");
      }
      console.log("API call made");
      const response = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });

      console.log(response.data);
      dispatch(profile(response.data)); // Update profile data
      dispatch(login(response.data)); // Log in the user

      navigate(<Outlet />);
    } catch (error) {
      navigate("/login");
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {/* Header positioned at the top */}
      <Header />
      {/* Messages Section */}

      <Outlet />
    </>
  );
}

export default App;
