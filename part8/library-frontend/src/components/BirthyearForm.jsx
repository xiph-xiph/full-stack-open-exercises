import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { editAuthorMutation, authorsQuery } from "../queries";
import {
  TextField,
  Stack,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const BirthyearForm = ({ authors }) => {
  const [editAuthor] = useMutation(editAuthorMutation, {
    refetchQueries: [{ query: authorsQuery }],
  });

  const [name, setName] = useState(authors[0].name);
  const [born, setBorn] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({
      variables: { name, setBornTo: Number(born) },
    });
    setBorn("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <Stack spacing={1} alignItems="baseline">
          <Typography variant="h4">Set Birthyear</Typography>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel>Name</InputLabel>
            <Select
              label="Name"
              size="small"
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map((author) => (
                <MenuItem value={author.name}>{author.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Birthyear"
            size="small"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
          <Button type="submit" variant="contained">
            Update Author
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default BirthyearForm;
