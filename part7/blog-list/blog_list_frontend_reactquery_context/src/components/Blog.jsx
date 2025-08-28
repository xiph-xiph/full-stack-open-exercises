import { useState, useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/UserContext";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const queryClient = useQueryClient();

  const likeBlogMutation = useMutation({
    mutationFn: () =>
      blogService.update({
        ...blog,
        likes: blog.likes + 1,
        user: blog.user.id,
      }),

    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.map((blog) =>
          blog.id === updatedBlog.id
            ? { ...blog, likes: blog.likes + 1 }
            : blog,
        ),
      );
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, deletedId) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.filter((blog) => blog.id !== deletedId),
      );
    },
  });

  const handleRemove = () =>
    window.confirm(
      `Are you sure you want to remove ${blog.title} by ${blog.author}?`,
    ) && removeBlogMutation.mutate(blog.id);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [user, _userDispatch] = useContext(UserContext);

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleVisibility} className="visButton">
        {isVisible ? "Hide" : "Show"}
      </button>
      {isVisible && (
        <>
          <div>{blog.url}</div>
          <div>
            {"likes: " + blog.likes}{" "}
            <button
              onClick={() => likeBlogMutation.mutate()}
              className="likeButton"
            >
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && (
            <button onClick={handleRemove}>Remove</button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
