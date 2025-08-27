import { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import ContextProvider from "./context/ContextProvider";
import blogService from "./services/blogs";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
    blogService.setToken(user?.token);
  }, [user]);

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <ContextProvider>
      {user ? (
        <BlogList user={user} handleLogout={handleLogout} />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </ContextProvider>
  );
};

export default App;
