import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const NavigationHeader = ({ token, handleLogout }) => {
  return (
    <>
      <Breadcrumbs>
        <Link component={RouterLink} to="/authors">
          Authors
        </Link>
        <Link component={RouterLink} to="/books">
          Books
        </Link>

        {token ? (
          [
            <Link component={RouterLink} to="/recommended">
              Recommended
            </Link>,
            <Link component={RouterLink} to="/newbook">
              Add New Book
            </Link>,
            <Link component="button" onClick={handleLogout}>
              Logout
            </Link>,
          ]
        ) : (
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        )}
      </Breadcrumbs>
      {token ? (
        <Typography variant="body1">You are logged in</Typography>
      ) : null}
    </>
  );
};

export default NavigationHeader;
