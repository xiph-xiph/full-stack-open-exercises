import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../reducers/sessionReducer";
import { useNavigate, Link } from "react-router-dom";
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
    <div style={menuStyle}>
      <Link to="/blogs">Blogs</Link>
      <Link to="/users">Users</Link>

      {user ? (
        <div>
          {user.name} is logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          no user is logged in
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default NavigationMenu;
