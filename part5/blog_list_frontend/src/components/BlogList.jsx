import { useState, useEffect, useRef } from 'react'
import Toggleable from './Toggleable'
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

  const blogFormRef = useRef()

  const closeForm = () => blogFormRef.current.toggleVisibility()

  const addBlogToList = newBlog => {
    setBlogs([...blogs, newBlog])
  }
  
  const likeBlog = async blogToLike => {
    const updatedBlog = await blogService.update({ ...blogToLike, likes: blogToLike.likes + 1 })
    setBlogs(blogs.map(blog => (
      blog.id === updatedBlog.id ? updatedBlog : blog
    )))
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
      <Toggleable buttonLabel='Add new blog' ref={ blogFormRef }>
        <NewBlogForm addBlogToList={ addBlogToList } setNotification={ setNotification } closeForm={ closeForm }/>
      </Toggleable>
      { blogs.map(blog => <Blog key={ blog.id } blog={ blog } likeBlog={ likeBlog } /> ) }
    </>
  )
}

export default BlogList