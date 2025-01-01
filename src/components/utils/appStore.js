import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";  // Correct the import

const appStore = configureStore({
    reducer: {
        user: userReducer,  // Use the reducer here
    },        
});

export default appStore;
