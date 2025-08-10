import { useState } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  return (
    <div>
      {
        user ?
        <BlogList user={user} /> :
        <LoginForm setUser={setUser} />
      }
    </div>
  )
}

export default App