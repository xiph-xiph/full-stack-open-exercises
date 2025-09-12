import { useQuery } from "@apollo/client/react";
import { authorsQuery } from "../queries";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AuthorList = () => {
  const { loading, error, data } = useQuery(authorsQuery);

  if (loading)
    return (
      <>
        <Typography variant="h3">Authors</Typography>
        <Typography variant="body1">Loading authors...</Typography>
      </>
    );

  if (error) return <Typography variant="body1">ERROR: {error}</Typography>;

  const authors = data.allAuthors;

  return (
    <>
      <Typography variant="h3">Authors</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Books</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow key={author.id}>
                <TableCell>{author.name}</TableCell>
                <TableCell>{author.born ?? "Unknown"}</TableCell>
                <TableCell>{author.bookCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AuthorList;
