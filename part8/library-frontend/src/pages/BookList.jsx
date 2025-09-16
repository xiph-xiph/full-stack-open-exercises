import { useQuery } from "@apollo/client/react";
import { booksQuery } from "../queries";
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

const BookList = () => {
  const { loading, error, data } = useQuery(booksQuery);

  if (loading)
    return (
      <>
        <Typography variant="h3">Books</Typography>
        <Typography variant="body1">Loading books...</Typography>
      </>
    );

  if (error) return <Typography variant="body1">ERROR: {error}</Typography>;

  const books = data.allBooks;

  return (
    <div>
      <Typography variant="h3">Books</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Published</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((a) => (
              <TableRow key={a.title}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.author.name}</TableCell>
                <TableCell>{a.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookList;
