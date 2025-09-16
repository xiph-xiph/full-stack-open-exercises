import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";

const NavigationHeader = ({ token }) => {
  return (
    <Breadcrumbs>
      <Link component={RouterLink} to="/authors">
        Authors
      </Link>
      <Link component={RouterLink} to="/books">
        Books
      </Link>

      {token ? (
        <>
          <Link component={RouterLink} to="/newbook">
            Add New Book
          </Link>
          <Link>Logout</Link>
        </>
      ) : (
        <Link component={RouterLink} to="/login">
          Login
        </Link>
      )}
    </Breadcrumbs>
  );
};

export default NavigationHeader;
