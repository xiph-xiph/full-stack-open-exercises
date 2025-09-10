import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
import Toggleable from "../components/Toggleable";
import NewBlogForm from "../components/NewBlogForm";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const blogFormRef = useRef();
  const closeForm = () => blogFormRef.current.toggleVisibility();

  return (
    <>
      <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
        <h2>Create new blog</h2>
        <NewBlogForm
          addBlogToList={(newBlog) => dispatch(addBlog(newBlog))}
          closeForm={closeForm}
        />
      </Toggleable>
      {blogs.map((blog) => (
        <div style={blogStyle}>
          <Link to={blog.id} key={blog.id}>
            {blog.title}
          </Link>
        </div>
      ))}
    </>
  );
};

export default BlogList;
