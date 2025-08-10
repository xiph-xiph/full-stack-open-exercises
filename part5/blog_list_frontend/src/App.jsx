import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('user')
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      {
        user ?
        <BlogList user={ user } handleLogout={ handleLogout } /> :
        <LoginForm setUser={ setUser } />
      }
    </div>
  )
}

export default App