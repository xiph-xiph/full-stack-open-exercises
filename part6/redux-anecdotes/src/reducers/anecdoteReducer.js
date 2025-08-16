import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteOnAnecdote(state, action) {
      const anecdoteToVoteOn = state.find((anecdote) => anecdote.id === action.payload)
      anecdoteToVoteOn.votes += 1
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteOnAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAllAnecdotes()
  dispatch(setAnecdotes(anecdotes))
}

export const createNewAnecdote = anecdote => async dispatch => {
  const newAnecdote = await anecdoteService.createNewAnecdote(anecdote)
  dispatch(appendAnecdote(newAnecdote))
}

export default anecdoteSlice.reducer