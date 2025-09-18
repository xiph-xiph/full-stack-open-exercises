import {
  Alert,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FormEvent } from "react";
import diaryService from "../services/diaryService";
import { visibilityOptions, weatherOptions } from "../types";
import type { NewDiary, Diary } from "../types";
import { isAxiosError } from "axios";

interface NewEntryFormProps {
  addDiary: (diary: Diary) => void;
}

const NewEntryForm = ({ addDiary }: NewEntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const [errorNotif, setErrorNotif] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
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
    } catch (error) {
      if (isAxiosError<string>(error) && error.response?.data) {
        setErrorNotif(error.response?.data);
      }
    }
  };

  return (
    <>
      <Typography variant="h3">Add new entry</Typography>
      {errorNotif ? <Alert severity="error">{errorNotif}</Alert> : null}
      <form onSubmit={handleSubmit}>
        <Stack spacing={1} alignItems="baseline">
          <TextField
            type="date"
            variant="outlined"
            label="Date"
            size="small"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <div>
            <FormLabel>Visibility</FormLabel>
            <RadioGroup
              row
              defaultValue="good"
              value={visibility}
              onChange={(event) => setVisibility(event.target.value)}
            >
              {visibilityOptions.map((visibility) => (
                <FormControlLabel
                  value={visibility}
                  control={<Radio />}
                  label={visibility}
                />
              ))}
            </RadioGroup>
          </div>
          <div>
            <FormLabel>Weather</FormLabel>
            <RadioGroup
              row
              defaultValue="sunny"
              value={weather}
              onChange={(event) => setWeather(event.target.value)}
            >
              {weatherOptions.map((weather) => (
                <FormControlLabel
                  value={weather}
                  control={<Radio />}
                  label={weather}
                />
              ))}
            </RadioGroup>
          </div>
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
