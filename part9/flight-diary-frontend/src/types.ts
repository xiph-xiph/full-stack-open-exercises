type Weather = "sunny" | "windy" | "cloudy" | "rainy" | "stormy";
type Visibility = "great" | "good" | "ok" | "poor";

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}
