import { useQuery } from "@apollo/client/react";
import { booksQuery, meQuery } from "../queries";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";

const Recommended = () => {
  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(booksQuery);
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(meQuery);

  if (booksLoading || userLoading)
    return (
      <>
        <Typography variant="h3">Recommended Books For You</Typography>
        <Typography variant="body1">Loading...</Typography>
      </>
    );

  if (booksError || userError)
    return (
      <Typography variant="body1">
        ERROR: {booksError} {userError}
      </Typography>
    );

  const books = booksData.allBooks;
  const filter = userData.me.favoriteGenre;

  const filteredBooks = books.filter((book) => book.genres.includes(filter));

  return (
    <Stack spacing={1}>
      <Typography variant="h3">Recommended Books For You</Typography>
      <Typography variant="body1">Your favorite genre is: {filter}</Typography>

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
            {filteredBooks.map((a) => (
              <TableRow key={a.title}>
                <TableCell>{a.title}</TableCell>
                <TableCell>{a.author.name}</TableCell>
                <TableCell>{a.published}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Recommended;
