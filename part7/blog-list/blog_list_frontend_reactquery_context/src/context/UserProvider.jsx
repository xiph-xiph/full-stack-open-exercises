import { useReducer, useEffect } from "react";
import UserContext from "./UserContext";
import blogService from "../services/blogs";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const getStoredUser = (defaultUser) => {
  const localUser = window.localStorage.getItem("user");
  return localUser ? JSON.parse(localUser) : defaultUser;
};

const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, null, getStoredUser);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("user", JSON.stringify(user));
      blogService.setToken(user.token);
    } else {
      window.localStorage.removeItem("user");
      blogService.setToken(null);
    }
  }, [user]);

  return <UserContext value={[user, userDispatch]}>{children}</UserContext>;
};

export default UserProvider;
