import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HomeRedirect = () => {
  const user = useSelector((state) => state.session);

  return user ? <Navigate to={"/blogs"} /> : <Navigate to={"/login"} />;
};

export default HomeRedirect;
