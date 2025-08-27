import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    addBlog(state, action) {
      state.push(action.payload);
      state.sort((a, b) => b.likes - a.likes);
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    likeBlog(state, action) {
      const blogToLike = state.find((blog) => blog.id === action.payload);
      blogToLike.likes += 1;
    },
  },
});

export const { setBlogs, addBlog, deleteBlog, likeBlog } = blogSlice.actions;

export default blogSlice.reducer;
