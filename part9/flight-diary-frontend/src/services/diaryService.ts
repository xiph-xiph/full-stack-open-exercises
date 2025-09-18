import axios from "axios";
import type { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const all = await axios.get<Diary[]>(baseUrl);
  return all.data;
};

const addNew = async (newDiary: NewDiary) => {
  const added = await axios.post<Diary>(baseUrl, newDiary);
  return added.data;
};

export default { getAll, addNew };
