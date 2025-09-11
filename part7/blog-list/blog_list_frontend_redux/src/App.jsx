import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setBlogs } from "./reducers/blogsReducer";
import { setUser } from "./reducers/sessionReducer";
import { setUsers } from "./reducers/usersReducer";
import Notification from "./components/Notification";
import BlogList from "./pages/BlogList";
import LoginForm from "./pages/LoginForm";
import UsersList from "./pages/UserList";
import BlogDetails from "./pages/BlogDetails";
import blogService from "./services/blogs";
import NavigationMenu from "./components/NavigationMenu";
import UserDetails from "./pages/UserDetails";
import usersService from "./services/users";
import HomeRedirect from "./pages/HomeRedirect";

import { Container, Typography, Divider, Stack } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    };
    fetchBlogs();
  }, [dispatch]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      dispatch(setUser(JSON.parse(loggedInUser)));
    } else {
      navigate("login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    user && window.localStorage.setItem("user", JSON.stringify(user));
    blogService.setToken(user?.token);
  }, [user]);

  useEffect(() => {
    usersService.getAll().then((users) => {
      dispatch(setUsers(users));
    });
  }, [dispatch]);

  return (
    <Container>
      <Stack
        spacing={1}
        sx={{
          alignItems: "baseline",
        }}
      >
        {user ? <NavigationMenu /> : null}
        <Notification />
        <Typography variant="h3">Blog App</Typography>
        <Divider />
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </Stack>
    </Container>
  );
};

export default App;
