import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, addBlog } from "../reducers/blogsReducer";
import Toggleable from "./Toggleable";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import blogService from "../services/blogs";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.session);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    };
    fetchBlogs();
  }, [dispatch]);

  const blogFormRef = useRef();
  const closeForm = () => blogFormRef.current.toggleVisibility();

  return (
    <>
      <h2>Create new blog</h2>
      <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
        <NewBlogForm
          addBlogToList={(newBlog) => dispatch(addBlog(newBlog))}
          closeForm={closeForm}
        />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          ownedByUser={blog.user.username === user.username}
        />
      ))}
    </>
  );
};

export default BlogList;
