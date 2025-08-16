import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNew = async (event) => {
    event.preventDefault()
    dispatch(createNewAnecdote({ content: event.target.anecdote.value, likes: 0 }))
    dispatch(setNotification(`you created '${ event.target.anecdote.value }'`))
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