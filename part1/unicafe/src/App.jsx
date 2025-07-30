import { useState } from 'react'

const StatisticLine = ({text, value, showPercentage=false}) => {
  
  if (showPercentage) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average =  ((good - bad) / all).toFixed(2)
  const positive = (good / (all) * 100).toFixed(2)

  if (all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>no feedback yet</p>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text={'good'} value={good} />
            <StatisticLine text={'neutral'} value={neutral} />
            <StatisticLine text={'bad'} value={bad} />
            <StatisticLine text={'all'} value={all} />
            <StatisticLine text={'average'} value={average} />
            <StatisticLine text={'positive'} value={positive} showPercentage={true} />
          </tbody>
        </table>
      </>
    )
  }
}


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text={'good'} />
      <Button onClick={handleNeutral} text={'neutral'} />
      <Button onClick={handleBad} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App