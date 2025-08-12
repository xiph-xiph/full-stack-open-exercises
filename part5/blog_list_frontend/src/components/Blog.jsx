import { useState } from 'react'
import Toggleable from "./Toggleable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div style={ blogStyle }>
      { blog.title } { blog.author } 
      <button onClick={ toggleVisibility }>{ isVisible ? 'Hide' : 'Show' }</button>
      { isVisible && (
        <>
          <div>{ blog.url }</div>
          <div>{ 'likes: ' + blog.likes }</div>
          <div>{ blog.user.name }</div>
        </>
      )}
    </div>
  )
}

export default Blog