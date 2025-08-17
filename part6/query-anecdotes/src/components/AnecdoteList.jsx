import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAllAnecdotes, updateAnecdote } from '../services/anecdoteService'

const AnecdoteList = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAllAnecdotes,
    retry: 1
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    }
  })

  const handleVote = (anecdote) => {
    console.log(anecdote)
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (result.isLoading) return <div>Loading data...</div>
  if (result.isError) return <div>anecdote service not available due to server problem</div>

  const anecdotes = result.data


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