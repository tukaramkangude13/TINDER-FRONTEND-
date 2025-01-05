import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"; // Adjust the path to match your project structure

const appStore = configureStore({
  reducer: {
    connections: connectionReducer,
    user: userReducer, 
    feed: feedReducer,
  },        
});

export default appStore;
