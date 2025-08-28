import { useContext } from "react";
import UserContext from "./context/UserContext";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [user, userDispatch] = useContext(UserContext);

  const handleLogout = () => {
    window.localStorage.clear();
    userDispatch({ type: "CLEAR" });
  };

  return (
    <>
      <Notification />
      {user ? <BlogList handleLogout={handleLogout} /> : <LoginForm />}
    </>
  );
};

export default App;
