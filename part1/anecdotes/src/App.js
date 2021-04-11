import React, { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const Body = ({ heading , content , numVotes}) => {
  return (
    <>
      <h1>{heading}</h1>
      <p>{content}</p>
      <p>{numVotes}</p>
    </>
  )
};


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0);
  const _s = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  const [vote, setVote] = useState(_s);

  const chooseAnecdote = () => {
    let randIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected((selected + randIndex) > 5 ? selected % randIndex : selected + randIndex);
  };

  const temp = vote[selected] === 1 ? `has ${vote[selected]} vote`: `has ${vote[selected]} votes`;

  const voteAnecdote = () => {
    const newVote = {...vote};
    newVote[selected] += 1
    setVote(newVote);
  };

  const maxVotes = () => {
    return Object.keys(vote).reduce((x, y) => vote[x] > vote[y] ? x : y)
  }

  return (
    <div>
      <Body heading="Anecdote of the day" content={anecdotes[selected]} numVotes={temp}/>
      <p>
        <Button handleClick={voteAnecdote} text="vote" />
        <Button handleClick={chooseAnecdote} text="next anecdote" />
      </p>
      <Body heading="Anecdote with most votes" content={anecdotes[maxVotes()]} numVotes={`has ${vote[maxVotes()]} votes`}/>
    </div>
  )
}


export default App;