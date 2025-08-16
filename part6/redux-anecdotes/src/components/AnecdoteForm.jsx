import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    const newAnecdote = await anecdoteService.createNewAnecdote(event.target.anecdote.value)
    dispatch(createNewAnecdote(newAnecdote))
    dispatch(setNotification(`you created '${ newAnecdote.content }'`))
    event.target.anecdote.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={ addNew }>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm