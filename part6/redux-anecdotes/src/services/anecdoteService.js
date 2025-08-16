import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => (await axios.get(baseUrl)).data

const createNewAnecdote = async (anecdote) => (await axios.post(baseUrl, anecdote)).data

export default { getAllAnecdotes, createNewAnecdote }