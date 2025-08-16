import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => (await axios.get(baseUrl)).data

const createNewAnecdote = async (content) => (await axios.post(baseUrl, {
  content,
  votes: 0
})).data

export default { getAllAnecdotes, createNewAnecdote }