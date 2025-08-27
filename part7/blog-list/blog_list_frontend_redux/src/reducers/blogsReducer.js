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
      state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, addBlog, deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;
