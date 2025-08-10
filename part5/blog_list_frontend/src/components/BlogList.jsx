import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ user, handleLogout }) => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <>
      <h2> Blogs</h2>
      <p>
        { user.name } is logged in
        <button onClick={ handleLogout }>Logout</button>
      </p>
      { blogs.map(blog => <Blog key={ blog.id } blog={ blog } /> ) }
    </>
  )
}

export default BlogList