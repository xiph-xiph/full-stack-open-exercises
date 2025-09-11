import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { useNavigate } from "react-router-dom";
import { setUser } from "../reducers/sessionReducer";
import loginService from "../services/login";

import { Typography, TextField, Button, Stack } from "@mui/material";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/");
    } catch (error) {
      dispatch(setNotification(error.response?.data?.error, true));
    }
  };

  return (
    <>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={1}
          sx={{
            alignItems: "baseline",
          }}
        >
          <TextField
            value={username}
            onChange={handleUsernameChange}
            label="Username"
            variant="outlined"
            size="small"
          />
          <TextField
            value={password}
            onChange={handlePasswordChange}
            label="Password"
            type="password"
            variant="outlined"
            size="small"
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
