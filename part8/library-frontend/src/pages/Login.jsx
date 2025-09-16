import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { loginMutation } from "../queries";
import { TextField, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [login] = useMutation(loginMutation);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data } = await login({ variables: { username, password } });
    setToken(data.login.value);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack spacing={1} alignItems="baseline">
          <Typography variant="h3">Login</Typography>
          <TextField
            label="Username"
            size="small"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <TextField
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default Login;
