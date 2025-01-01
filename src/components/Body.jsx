import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Login from "./Login";
import Profile from "./Profile";

export function Body() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> 
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
