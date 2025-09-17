import { isNotNumber } from "./utils";

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / ((height * height) / 10000);
  if (bmi < 18.5) return "Underweight";
  if (bmi > 25) return "Overweight";
  return "Normal range";
};

const validateInputs = (inputs: any[]): boolean => {
  if (inputs.length !== 2 || isNotNumber(inputs[0]) || isNotNumber(inputs[1])) {
    return false;
  } else {
    return true;
  }
};

if (require.main === module) {
  const rawInputs: any[] = process.argv.slice(2);

  if (validateInputs(rawInputs)) {
    const typedInputs: number[] = rawInputs.map((input: any) => Number(input));
    console.log(calculateBmi(typedInputs[0], typedInputs[1]));
  } else {
    console.log("Usage: 'npm run bmiCalculator <height (cm)> <weight (kg)>'.");
  }
}

export { calculateBmi, validateInputs };
