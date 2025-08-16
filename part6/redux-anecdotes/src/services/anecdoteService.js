import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => (await axios.get(baseUrl)).data

const createNewAnecdote = async (anecdote) => (await axios.post(baseUrl, anecdote)).data

const getAnecdoteById = async (id) => (await axios.get(`${baseUrl}/${id}`)).data

const changeAnecdote = async (anecdote) => (await axios.put(`${baseUrl}/${anecdote.id}`, anecdote))

export default { getAllAnecdotes, createNewAnecdote, getAnecdoteById, changeAnecdote }