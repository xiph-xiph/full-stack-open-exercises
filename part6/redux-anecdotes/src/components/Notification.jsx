import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import { removeNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const timeoutRef = useRef()
  useEffect(() => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => dispatch(removeNotification()), 5000)
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

export default Notification