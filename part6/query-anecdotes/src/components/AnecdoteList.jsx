import { useQuery } from '@tanstack/react-query'
import { getAllAnecdotes } from '../services/anecdoteService'

const AnecdoteList = () => {

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    retry: 1
  })

  if (result.isLoading) return <div>Loading data...</div>
  if (result.isError) return <div>anecdote service not available due to server problem</div>

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log(`vote ${anecdote}`)
  }

  return (
    <>
      <h3>Anecdotes</h3>
      { anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList