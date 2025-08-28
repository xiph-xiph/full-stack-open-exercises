import { useRef, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../context/UserContext";
import blogService from "../services/blogs";
import Toggleable from "./Toggleable";
import Blog from "./Blog";
import NewBlogForm from "./NewBlogForm";
import PropTypes from "prop-types";

const BlogList = ({ handleLogout }) => {
  const blogQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
  const blogs = blogQuery.data;
  blogs && blogs.sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();
  const closeForm = () => blogFormRef.current.toggleVisibility();

  const [user, _userDispatch] = useContext(UserContext);

  if (blogQuery.isLoading) {
    return <div>loading data...</div>;
  }

  return (
    <>
      <h2>Blogs</h2>
      <p>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Create new blog</h2>
      <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
        <NewBlogForm closeForm={closeForm} />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
};

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default BlogList;
