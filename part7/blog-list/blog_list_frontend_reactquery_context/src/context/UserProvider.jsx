import { useReducer } from "react";
import UserContext from "./UserContext";
import blogService from "../services/blogs";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      window.localStorage.setItem("user", JSON.stringify(action.payload));
      blogService.setToken(action.payload?.token);
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
  return <UserContext value={[user, userDispatch]}>{children}</UserContext>;
};

export default UserProvider;
