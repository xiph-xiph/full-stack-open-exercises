import { Stack, Typography } from "@mui/material";
import type { Diary } from "../types";

interface DiaryListProps {
  diaries: Array<Diary>;
}

const DiaryList = ({ diaries }: DiaryListProps) => {
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
