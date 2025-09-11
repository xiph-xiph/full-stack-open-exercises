import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../reducers/sessionReducer";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumbs, Stack, Button } from "@mui/material";

const NavigationMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuStyle = {
    marginBottom: 5,
    backgroundColor: "lightgray",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const user = useSelector((state) => state.session);

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(clearUser());
    navigate("login");
  };

  return (
    <Stack spacing={2} direction="row" style={menuStyle}>
      <Breadcrumbs spacing={2} direction="row" separator="|">
        <Link to="/blogs">Blogs</Link>
        <Link to="/users">Users</Link>
      </Breadcrumbs>
      {user ? (
        <>
          <div>{user.name} is logged in</div>
          <Button variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </>
      ) : (
        <div>
          no user is logged in
          <Link to="/login">Login</Link>
        </div>
      )}
    </Stack>
  );
};

export default NavigationMenu;
