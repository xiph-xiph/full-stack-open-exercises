import express from "express";
import { calculateBmi, validateInputs } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height =
    typeof req.query.height === "string" ? req.query.height : undefined;
  const weight =
    typeof req.query.weight === "string" ? req.query.weight : undefined;
  if (validateInputs([height, weight])) {
    res.json({
      height,
      weight,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } else {
    res.json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
