import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  newBookMutation,
  loginMutation,
  booksQuery,
  authorsQuery,
} from "../queries";
import {
  TextField,
  Stack,
  Button,
  Typography,
  Chip,
  Grid,
} from "@mui/material";

const NewBook = () => {
  const [addNewBook] = useMutation(newBookMutation, {
    refetchQueries: [{ query: booksQuery }, { query: authorsQuery }],
  });

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    addNewBook({
      variables: { title, author, published: Number(published), genres },
    });
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <Stack spacing={1} alignItems="baseline">
          <Typography variant="h3">Add New Book</Typography>
          <TextField
            label="Title"
            size="small"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <TextField
            label="Author"
            size="small"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <TextField
            label="Year Published"
            size="small"
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
          <Stack direction="row" spacing={1}>
            <TextField
              label="Genre"
              size="small"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
            <Button onClick={addGenre} type="button" variant="contained">
              Add Genre
            </Button>
          </Stack>
          <Typography variant="body1">Genres:</Typography>
          <Grid container spacing={0.2}>
            {genres.map((genre) => (
              <Chip key={genre} label={genre} />
            ))}
          </Grid>
          <Button type="submit" variant="contained">
            Create Book
          </Button>
        </Stack>
      </form>
    </div>
  );
};

const Login = () => {
  const [login] = useMutation(loginMutation);
};

export default Login;
