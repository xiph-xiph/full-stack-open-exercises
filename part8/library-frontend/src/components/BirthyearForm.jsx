import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { editAuthorMutation, authorsQuery } from "../queries";
import { TextField, Stack, Button, Typography } from "@mui/material";

const BirthyearForm = () => {
  const [editAuthor] = useMutation(editAuthorMutation, {
    refetchQueries: [{ query: authorsQuery }],
  });

  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    editAuthor({
      variables: { name, setBornTo: Number(born) },
    });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <Stack spacing={1} alignItems="baseline">
          <Typography variant="h4">Set Birthyear</Typography>
          <TextField
            label="Name"
            size="small"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
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
