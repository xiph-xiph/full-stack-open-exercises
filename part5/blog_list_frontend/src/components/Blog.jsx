import { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const handleLike = () => likeBlog(blog)

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div style={ blogStyle }>
      { blog.title } { blog.author } 
      <button onClick={ toggleVisibility }>{ isVisible ? 'Hide' : 'Show' }</button>
      { isVisible && (
        <>
          <div>{ blog.url }</div>
          <div>{ 'likes: ' + blog.likes } <button onClick={ handleLike }>like</button></div>
          <div>{ blog.user.name }</div>
        </>
      )}
    </div>
  )
}

export default Blog