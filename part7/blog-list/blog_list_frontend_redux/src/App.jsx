import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import { setUser } from "./reducers/sessionReducer";
import { setUsers } from "./reducers/usersReducer";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UsersList from "./components/UsersList";
import blogService from "./services/blogs";
import LoggedInHeader from "./components/LoggedInHeader";
import UserDetails from "./components/UserDetails";
import usersService from "./services/users";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);

  const navigate = useNavigate();

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
    <div>
      <Notification />
      {user ? <LoggedInHeader /> : null}
      <Routes>
        <Route path="login" element={<LoginForm />} />
        <Route path="/" element={<BlogList />} />
        <Route path="users" element={<UsersList />} />
        <Route path="users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default App;
