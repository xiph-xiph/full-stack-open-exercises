import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return { message: '', timeout: -1 }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, { message: '', timeout: -1 })

  const setNotification = newNotification => {
    clearTimeout(notification.timeout)
    const timeout = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
    notificationDispatch({ type: 'SET', payload: { message: newNotification, timeout } })
  }

  return (
    <NotificationContext value={ [notification, setNotification] }>
      { children }
    </NotificationContext>
  )
}

export default NotificationContext