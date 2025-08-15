import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => (await axios.get(baseUrl)).data

export default { getAllAnecdotes }