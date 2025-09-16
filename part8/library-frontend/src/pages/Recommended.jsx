import { useQuery } from "@apollo/client/react";
import { recommendedBooksQuery, meQuery } from "../queries";
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
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(meQuery);

  const genre = userData?.me.favoriteGenre;

  const {
    loading: booksLoading,
    error: booksError,
    data: booksData,
  } = useQuery(recommendedBooksQuery, { variables: { genre }, skip: !genre });

  if (booksLoading || userLoading)
    return (
      <>
        <Typography variant="h3">Recommended Books For You</Typography>
        <Typography variant="body1">Loading...</Typography>
      </>
    );

  if (booksError || userError)
    return <Typography variant="body1">ERROR: {booksError}</Typography>;

  const books = booksData.allBooks;

  return (
    <Stack spacing={1}>
      <Typography variant="h3">Recommended Books For You</Typography>
      <Typography variant="body1">Your favorite genre is: {genre}</Typography>

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
    </Stack>
  );
};

export default Recommended;
