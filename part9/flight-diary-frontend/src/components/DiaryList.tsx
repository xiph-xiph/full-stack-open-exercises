import { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Typography } from "@mui/material";
import type { Diary } from "../types";

const DiaryList = () => {
  const [diaries, setDiaries] = useState<Array<Diary>>([]);

  useEffect(() => {
    axios
      .get<Diary[]>("http://localhost:3000/api/diaries")
      .then((response) => setDiaries(response.data));
  }, []);
  return (
    <Stack spacing={2}>
      <Typography variant="h3">Diary entries</Typography>
      {diaries.map((diary) => (
        <Stack key={diary.id}>
          <Typography variant="h5">{diary.date}</Typography>
          <Typography variant="body1">
            visibility: {diary.visibility}
          </Typography>
          <Typography variant="body1">weather: {diary.weather}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default DiaryList;
