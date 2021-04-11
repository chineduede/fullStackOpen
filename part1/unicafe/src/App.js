import React, { useState } from 'react';


const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Header = ({ text }) => <h1>{text}</h1>
const Body = ({ text }) => <h2>{text}</h2>

const Statistic = ({ text, count}) => <tr><th>{text}</th><td>{count}</td></tr>

const Statistics = ({ values }) => {
  const [ good, neutral, bad ] = values;
  const totalClicks = good + bad + neutral;

  const averageClicks = () => {
    let ave = (good - bad) / totalClicks
    ave = ave.toFixed(1);
    return ave;
  }

  const weightedClicks = () => {
    let wetClicks = (good / totalClicks) * 100;
    wetClicks = wetClicks.toFixed(1)
    return wetClicks + '%'
  }

    if (values.reduce((x,y) => x+y, 0) === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }
    return (
      <div>
        <table>
          <tbody>
          <Statistic text="good" count={good} />
          <Statistic text="neutral" count={neutral} />
          <Statistic text="bad" count={bad} />
          <Statistic text="all" count={totalClicks}/>
          <Statistic text="average" count={averageClicks()}/>
          <Statistic text="positive" count={weightedClicks()} />
          </tbody>
        </table>
      </div>
    )
}


const App = () => {
  // save clicks of each button to its own state
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad , setBad ] = useState(0);
  
  const clickRecorder = (value, updater) => () => updater(value);
  


  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={clickRecorder(good + 1, setGood)} text="good" />
      <Button handleClick={clickRecorder(neutral + 1, setNeutral)} text="neutral" />
      <Button handleClick={clickRecorder(bad + 1, setBad)} text="bad" />
      <Body text="statistics" />
      <Statistics values={[good, neutral, bad]}/>
    </div>
  )
}



export default App;

