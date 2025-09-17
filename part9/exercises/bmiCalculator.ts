const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height * height) / 10000);
  if (bmi < 18.5) return "Too low";
  if (bmi > 25) return "Too high";
  return "Normal range";
};

console.log(calculateBmi(180, 74));
