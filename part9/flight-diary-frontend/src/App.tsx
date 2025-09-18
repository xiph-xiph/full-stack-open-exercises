import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import NewEntryForm from "./components/NewEntryForm";
import type { Diary } from "./types";
import { Stack } from "@mui/material";

function App() {
  const [diaries, setDiaries] = useState<Array<Diary>>([]);
  const addDiary = (diary: Diary) => setDiaries(diaries.concat(diary));

  useEffect(() => {
    (async () => {
      setDiaries(await diaryService.getAll());
    })();
  }, []);
  return (
    <Stack spacing={1}>
      <NewEntryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </Stack>
  );
}

export default App;
