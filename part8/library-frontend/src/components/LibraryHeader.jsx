import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, Link } from "@mui/material";

const LibraryHeader = () => {
  return (
    <Breadcrumbs>
      <Link component={RouterLink} to="/authors">
        Authors
      </Link>
      <Link component={RouterLink} to="/books">
        Books
      </Link>
      <Link component={RouterLink} to="/newbook">
        Add New Book
      </Link>
    </Breadcrumbs>
  );
};

export default LibraryHeader;
