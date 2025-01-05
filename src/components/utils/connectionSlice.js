import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections", 
  initialState: {
    connections: null,
  },
  reducers: {
    setConnections: (state, action) => {
      state.connections = action.payload; 
    },
  },
});

export default connectionSlice.reducer;

export const { setConnections } = connectionSlice.actions;
