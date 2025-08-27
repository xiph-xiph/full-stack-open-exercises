import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";

const LoginForm = () => {
  const dispatch = useDispatch();

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
      dispatch(setNotification("Logged in succesfully", false));
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(setNotification(error.response?.data?.error, true));
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
