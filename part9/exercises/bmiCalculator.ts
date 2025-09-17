import { isNotNumber } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height * height) / 10000);
  if (bmi < 18.5) return "Underweight";
  if (bmi > 25) return "Overweight";
  return "Normal range";
};

const validateInputs = (inputs: any[]): boolean => {
  if (inputs.length !== 4 || isNotNumber(inputs[2]) || isNotNumber(inputs[3])) {
    return false;
  } else {
    return true;
  }
};
const rawInputs: any[] = process.argv;

if (validateInputs(rawInputs)) {
  const typedInputs: number[] = rawInputs.map((input: any) => Number(input));
  console.log(calculateBmi(typedInputs[2], typedInputs[3]));
} else {
  console.log("Usage: 'npm run bmiCalculator <height (cm)> <weight (kg)>'.");
}
