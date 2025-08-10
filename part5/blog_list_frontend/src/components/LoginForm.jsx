import { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser }) => {
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
    const user = await loginService.login(username, password)
    setUser(user)
    setUsername('')
    setPassword('')
  }



  return (
    <>
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