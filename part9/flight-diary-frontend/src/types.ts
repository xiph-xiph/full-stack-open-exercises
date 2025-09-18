type Weather = "sunny" | "windy" | "cloudy" | "rainy" | "stormy";
type Visibility = "great" | "good" | "ok" | "poor";

export interface NewDiary {
  date: string;
  weather: Weather;
  visibility: Visibility;
}
export interface Diary extends NewDiary {
  id: number;
}
