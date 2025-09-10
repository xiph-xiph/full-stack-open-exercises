import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogsReducer";
import { setNotification } from "../reducers/notificationReducer";
import blogService from "../services/blogs";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.session);

  if (!blogs) {
    return <p>Loading blogs...</p>;
  }

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return <p>Blog with id '{id}' could not be found</p>;
  }

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
      navigate(-1);
    }
  };

  return (
    <>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <div>
        {blog.likes} likes
        <button onClick={handleLike} className="likeButton">
          Like
        </button>
      </div>
      <div>Added by {blog.user.name}</div>
      {user.username === blog.user.username ? (
        <button onClick={handleDelete}>Remove</button>
      ) : null}
    </>
  );
};

export default BlogDetails;
