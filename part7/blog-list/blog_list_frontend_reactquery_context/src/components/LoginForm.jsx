import { useState, useContext } from "react";
import NotificationContext from "../context/NotificationContext";
import UserContext from "../context/UserContext";
import loginService from "../services/login";

const LoginForm = () => {
  const [_notification, setNotification] = useContext(NotificationContext);
  const [_user, userDispatch] = useContext(UserContext);

  const [username, setUsername] = useState("");
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      setNotification("Logged in succesfully", false);
      userDispatch({ type: "SET", payload: user });
      setUsername("");
      setPassword("");
    } catch (error) {
      setNotification(error.response?.data?.error, true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          Username
          <input value={username} onChange={handleUsernameChange} />
        </div>

        <div>
          Password
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
