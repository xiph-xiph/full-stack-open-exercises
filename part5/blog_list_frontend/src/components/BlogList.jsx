import { useState, useEffect } from 'react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
import blogService from '../services/blogs'

const BlogList = ({ user, handleLogout }) => {
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

  const setNotification = (message, isError) => {
    setNotifMessage(message)
    setNotifIsError(isError)
  }

  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  const addBlogToList = newBlog => {
    setBlogs([...blogs, newBlog])
  }

  return (
    <>
      <h2>Blogs</h2>
      <Notification message={ notifMessage } isError={ notifIsError } />
      <p>
        { user.name } is logged in
        <button onClick={ handleLogout }>Logout</button>
      </p>
      <h2>Create new blog</h2>
      <NewBlogForm addBlogToList={ addBlogToList } setNotification={ setNotification }/>
      { blogs.map(blog => <Blog key={ blog.id } blog={ blog } /> ) }
    </>
  )
}

export default BlogList