import { useState, useEffect } from 'react'
import Notification from './Notification'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
  const [notifMessage, setNotifMessage] = useState('')
  const [notifIsError, setNotifIsError] = useState(false)
  useEffect(() => {
    if (notifMessage) {
      const timer = setTimeout(() => {
        setNotifMessage('')
        setNotifIsError(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notifMessage])

  const [username, setUsername] = useState('')
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const [password, setPassword] = useState('')
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setNotifMessage(error.response?.data?.error)
      setNotifIsError(true)
    }

  }



  return (
    <>
      <Notification message={ notifMessage } isError={ notifIsError } />
      <form onSubmit={handleSubmit}>

        <div>
          Username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          Password
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
        </div>

        <button type="submit">Login</button>

      </form>
    </>
  )
}

export default LoginForm