import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blogs";
import Toggleable from "./Toggleable";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import Notification from "./Notification";
import PropTypes from "prop-types";

const BlogList = ({ user, handleLogout }) => {
  const blogQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  const blogs = blogQuery.data;
  blogs && blogs.sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();
  const closeForm = () => blogFormRef.current.toggleVisibility();

  const likeBlog = async (blogToLike) => {
    const updatedBlog = await blogService.update({
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    });
    updatedBlog.user = blogToLike.user;
    // setBlogs(
    //   blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    // );
  };

  const removeBlog = async (blogToRemove) => {
    await blogService.remove(blogToRemove.id);
    // setBlogs(blogs.filter((blog) => blog.id !== blogToRemove.id));
  };

  if (blogQuery.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <>
      <h2>Blogs</h2>
      <Notification />
      <p>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Create new blog</h2>
      <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
        <NewBlogForm closeForm={closeForm} />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          removeBlog={removeBlog}
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
