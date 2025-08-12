import { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => likeBlog(blog)
  const handleRemove = () => window.confirm(`Are you sure you want to remove ${ blog.title } by ${ blog.author }?`) && removeBlog(blog)

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div style={ blogStyle }>
      { blog.title } { blog.author } 
      <button onClick={ toggleVisibility }>{ isVisible ? 'Hide' : 'Show' }</button>
      { isVisible && (
        <>
          <div>{ blog.url }</div>
          <div>{ 'likes: ' + blog.likes } <button onClick={ handleLike }>Like</button></div>
          <div>{ blog.user.name }</div>
          <button onClick={ handleRemove }>Remove</button>
        </>
      )}
    </div>
  )
}

export default Blog