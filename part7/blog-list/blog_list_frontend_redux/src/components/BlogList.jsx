import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBlogs, addBlog } from "../reducers/blogsReducer";
import Toggleable from "./Toggleable";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const BlogList = ({ user, handleLogout }) => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    };
    fetchBlogs();
  }, [dispatch]);

  const blogFormRef = useRef();
  const closeForm = () => blogFormRef.current.toggleVisibility();

  const addBlogToList = (newBlog) => {
    dispatch(addBlog(newBlog));
  };

  return (
    <>
      <h2>Blogs</h2>
      <p>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Create new blog</h2>
      <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
        <NewBlogForm addBlogToList={addBlogToList} closeForm={closeForm} />
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

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default BlogList;
