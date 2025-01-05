import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    feed: [],
  },
  reducers: {
    setFeed: (state, action) => {
      state.feed = action.payload;
    },
    removeFeed: (state, action) => {
      state.feed = state.feed.filter((user) => user._id !== action.payload);
    },
  },
});

export const { setFeed, removeFeed } = feedSlice.actions;
export const selectFeed = (state) => state.feed.feed;
export default feedSlice.reducer;
