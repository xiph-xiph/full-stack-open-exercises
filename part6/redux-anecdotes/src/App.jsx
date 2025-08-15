import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: { id }
    })
  }

  const addNew = (event) => {
    event.preventDefault()
    dispatch({
      type: 'ADD_NEW',
      payload: event.target.anecdote.value
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={ anecdote.id }>
          <div>
            { anecdote.content }
          </div>
          <div>
            has { anecdote.votes }
            <button onClick={ () => vote(anecdote.id) }>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={ addNew }>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App