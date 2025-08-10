import { useState, useEffect } from 'react'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'
import blogService from '../services/blogs'

const BlogList = ({ user, handleLogout }) => {
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
      <p>
        { user.name } is logged in
        <button onClick={ handleLogout }>Logout</button>
      </p>
      <h2>Create new blog</h2>
      <NewBlogForm addBlogToList={ addBlogToList }/>
      { blogs.map(blog => <Blog key={ blog.id } blog={ blog } /> ) }
    </>
  )
}

export default BlogList