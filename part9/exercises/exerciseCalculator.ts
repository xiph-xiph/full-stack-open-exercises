interface Result {
  totalDays: number;
  totalTrainingDays: number;
  target: number;
  averageTime: number;
  targetWasReached: boolean;
  rating: 1 | 2 | 3;
  ratingExplanation: string;
}

const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): Result => {
  const totalDays: number = dailyExerciseHours.length;
  const totalTrainingDays: number = dailyExerciseHours.reduce(
    (acc, hours) => (hours > 0 ? acc + 1 : acc),
    0
  );
  const totalTime: number = dailyExerciseHours.reduce(
    (acc, hours) => acc + hours,
    0
  );
  const averageTime: number = totalTime / totalDays;
  const calculatedScore = averageTime / target;
  const targetWasReached: boolean = calculatedScore >= 1;
  let rating: 1 | 2 | 3;
  let ratingExplanation: string;
  if (targetWasReached) {
    rating = 3;
    ratingExplanation = "You reached your target. Well done.";
  } else if (calculatedScore > 0.75) {
    rating = 2;
    ratingExplanation =
      "You didn't do too bad, but you could have done better.";
  } else {
    rating = 1;
    ratingExplanation = "You could have done better. Try again next time!";
  }
  return {
    totalDays,
    totalTrainingDays,
    target,
    averageTime,
    targetWasReached,
    rating,
    ratingExplanation,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
