import { useQuery, useSubscription } from "@apollo/client/react";
import {
  allBooksQuery,
  booksByGenreQuery,
  bookAddedSubscription,
} from "../queries";
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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useState } from "react";

const BookList = () => {
  const {
    data: allBooksData,
    loading: allBooksLoading,
    error: allBooksError,
  } = useQuery(allBooksQuery);

  useSubscription(bookAddedSubscription, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded;
      console.log(`${addedBook.title} was added`);
      client.cache.updateQuery({ query: allBooksQuery }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  const [filter, setFilter] = useState(null);

  const {
    data: booksByGenreData,
    loading: booksByGenreLoading,
    error: booksByGenreError,
  } = useQuery(booksByGenreQuery, {
    variables: { genre: filter },
    skip: !filter,
  });

  if (allBooksLoading || booksByGenreLoading)
    return (
      <>
        <Typography variant="h3">Books</Typography>
        <Typography variant="body1">Loading books...</Typography>
      </>
    );

  if (allBooksError || booksByGenreError)
    return (
      <Typography variant="body1">
        ERROR: {allBooksError} {booksByGenreError}
      </Typography>
    );

  const genresMap = allBooksData.allBooks.reduce((allGenres, book) => {
    book.genres.forEach((genre) => allGenres.add(genre));
    return allGenres;
  }, new Set());

  const genres = Array.from(genresMap);

  const books = booksByGenreData
    ? booksByGenreData.allBooks
    : allBooksData.allBooks;

  const handleFilter = (_event, newFilter) => setFilter(newFilter);

  return (
    <Stack spacing={1}>
      <Typography variant="h3">Books</Typography>

      <ToggleButtonGroup exclusive value={filter} onChange={handleFilter}>
        {genres.map((genre) => (
          <ToggleButton value={genre}>{genre}</ToggleButton>
        ))}
      </ToggleButtonGroup>

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

export default BookList;
