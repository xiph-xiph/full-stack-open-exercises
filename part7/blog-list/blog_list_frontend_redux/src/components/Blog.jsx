import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, ownedByUser }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async () => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    });
    updatedBlog.user = blog.user;
    dispatch(likeBlog(blog.id));
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove ${blog.title} by ${blog.author}?`,
      )
    ) {
      await blogService.remove(blog.id);
      dispatch(setNotification(`Blog "${blog.title}" succesfully removed`));
      dispatch(deleteBlog(blog.id));
    }
  };

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

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
            <button onClick={handleLike} className="likeButton">
              Like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {ownedByUser ? <button onClick={handleDelete}>Remove</button> : <></>}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  ownedByUser: PropTypes.func.isRequired,
};

export default Blog;
