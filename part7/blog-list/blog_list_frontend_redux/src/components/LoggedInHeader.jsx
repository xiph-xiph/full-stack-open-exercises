import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../reducers/sessionReducer";
import { useNavigate, Link } from "react-router-dom";
const LoggedInHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.session);

  const handleLogout = () => {
    window.localStorage.clear();
    dispatch(clearUser());
    navigate("login");
  };

  return (
    <>
      <h2>Blogs</h2>
      {user ? (
        <p>
          {user.name} is logged in
          <br />
          <button onClick={handleLogout}>Logout</button>
        </p>
      ) : (
        <>
          <p>no user is logged in</p>
          <br />
          <Link to="login">Login</Link>
        </>
      )}
    </>
  );
};

export default LoggedInHeader;
