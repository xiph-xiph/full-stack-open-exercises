/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import express from "express";
import { calculateBmi, validateInputs } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());

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

app.post("/exercises", (req, res) => {
  const daily_exercises: unknown = req.body?.daily_exercises;
  const target: unknown = req.body?.target;

  if (daily_exercises === undefined || target === undefined)
    return res.status(400).json({ error: "parameters missing" });

  if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((value) => !isNaN(Number(value))) ||
    typeof target !== "number"
  )
    return res.status(400).json({ error: "malformatted parameters" });

  return res.json(
    calculateExercises(
      daily_exercises.map((value) => Number(value)),
      target
    )
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
