import { useEffect, useState } from "react";
import diaryService from "./services/diaryService";
import DiaryList from "./components/DiaryList";
import NewEntryForm from "./components/NewEntryForm";
import type { Diary } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Array<Diary>>([]);
  const addDiary = (diary: Diary) => setDiaries(diaries.concat(diary));

  useEffect(() => {
    (async () => {
      setDiaries(await diaryService.getAll());
    })();
  }, []);
  return (
    <>
      <NewEntryForm addDiary={addDiary} />
      <DiaryList diaries={diaries} />
    </>
  );
}

export default App;
