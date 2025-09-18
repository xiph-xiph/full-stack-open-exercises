import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState, type FormEvent } from "react";
import diaryService from "../services/diaryService";
import type { NewDiary, Diary } from "../types";

interface NewEntryFormProps {
  addDiary: (diary: Diary) => void;
}

const NewEntryForm = ({ addDiary }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const addedDiary = await diaryService.addNew({
      date,
      visibility,
      weather,
      comment,
    } as NewDiary);
    addDiary(addedDiary);
    setDate("");
    setVisibility("");
    setWeather("");
    setComment("");
  };

  return (
    <>
      <Typography variant="h3">Add new entry</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={1} alignItems="baseline">
          <TextField
            variant="outlined"
            label="Date"
            size="small"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <TextField
            variant="outlined"
            label="Visibility"
            size="small"
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
          <TextField
            variant="outlined"
            label="Weather"
            size="small"
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
          <TextField
            variant="outlined"
            label="Comment"
            size="small"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button variant="contained" type="submit">
            Add
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default NewEntryForm;
