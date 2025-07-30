const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Part = (props) => {
  const part = props.part
  return (
    <>
      <p>{part.name} {part.exercises}</p>
    </>
  )
}

const Content = (props) => {
  const parts = props.parts
  return (
    <>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </>
  );
};

const Total = (props) => {
  const numberOfExercises = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>
      Number of exercises {numberOfExercises}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App