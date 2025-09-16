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
  Stack,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useState } from "react";

const BookList = () => {
  const { loading, error, data } = useQuery(booksQuery);

  const [filter, setFilter] = useState(null);

  if (loading)
    return (
      <>
        <Typography variant="h3">Books</Typography>
        <Typography variant="body1">Loading books...</Typography>
      </>
    );

  if (error) return <Typography variant="body1">ERROR: {error}</Typography>;

  const books = data.allBooks;

  const genresMap = books.reduce((allGenres, book) => {
    book.genres.forEach((genre) => allGenres.add(genre));
    return allGenres;
  }, new Set());

  const genres = Array.from(genresMap);

  const handleFilter = (event, newFilter) => setFilter(newFilter);

  const filteredBooks = books.filter(
    (book) => book.genres.includes(filter) || filter === null
  );

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

export default BookList;
