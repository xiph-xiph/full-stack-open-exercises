import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    changeAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id
          ? action.payload
          : anecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { changeAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => async dispatch => {
  const anecdotes = await anecdoteService.getAllAnecdotes()
  dispatch(setAnecdotes(anecdotes))
}

export const createNewAnecdote = anecdote => async dispatch => {
  const newAnecdote = await anecdoteService.createNewAnecdote(anecdote)
  dispatch(appendAnecdote(newAnecdote))
}

export const voteAnecdote = id => async dispatch => {
  const anecdoteToVote = await anecdoteService.getAnecdoteById(id)
  anecdoteToVote.votes += 1
  await anecdoteService.changeAnecdote(anecdoteToVote)
  dispatch(changeAnecdote(anecdoteToVote))
}

export default anecdoteSlice.reducer