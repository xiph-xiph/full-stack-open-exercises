import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../reducers/blogsReducer";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import Toggleable from "../components/Toggleable";
import NewBlogForm from "../components/NewBlogForm";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogFormRef = useRef();
  const closeForm = () => blogFormRef.current.toggleVisibility();

  return (
    <Stack
      spacing={1}
      sx={{
        alignItems: "baseline",
      }}
    >
      <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
        <h2>Create new blog</h2>
        <NewBlogForm
          addBlogToList={(newBlog) => dispatch(addBlog(newBlog))}
          closeForm={closeForm}
        />
      </Toggleable>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={blog.id}>{blog.title}</Link>
                </TableCell>
                <TableCell align="right">{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default BlogList;
