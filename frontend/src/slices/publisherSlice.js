import { createSlice } from '@reduxjs/toolkit';

const publisherSlice = createSlice({
  name: 'publisher',
  initialState: { posts: [], scheduledPosts: [] },
  reducers: {
    addPost: (state, action) => { state.posts.unshift(action.payload); }
  }
});

export const { addPost } = publisherSlice.actions;
export default publisherSlice.reducer;
