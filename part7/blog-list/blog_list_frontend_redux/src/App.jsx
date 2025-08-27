import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./reducers/userReducer";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      dispatch(setUser(JSON.parse(loggedInUser)));
    }
  }, [dispatch]);

  useEffect(() => {
    user && window.localStorage.setItem("user", JSON.stringify(user));
    blogService.setToken(user?.token);
  }, [user]);

  return (
    <div>
      <Notification />
      {user ? <BlogList /> : <LoginForm />}
    </div>
  );
};

export default App;
