import express from "express";
import { calculateBmi, validateInputs } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  if (validateInputs([req.query.height, req.query.weight])) {
    res.json({
      height: req.query.height,
      weight: req.query.weight,
      bmi: calculateBmi(Number(req.query.height), Number(req.query.weight)),
    });
  } else {
    res.json({ error: "malformatted parameters" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
