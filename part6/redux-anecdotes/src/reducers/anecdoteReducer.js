import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteOnAnecdote(state, action) {
      const anecdoteToVoteOn = state.find((anecdote) => anecdote.id === action.payload)
      anecdoteToVoteOn.votes += 1
    },
    createNewAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteOnAnecdote, createNewAnecdote, setAnecdotes } = anecdoteSlice.actions

export default anecdoteSlice.reducer