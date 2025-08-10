import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ addBlogToList }) => {
  const [title, setTitle] = useState('')
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const [author, setAuthor] = useState('')
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const [url, setUrl] = useState('')
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const createdBlog = await blogService.addNew({ title, author, url })
    if (createdBlog) {
      addBlogToList(createdBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    
  }
  return (
  <>
    <form onSubmit={ handleSubmit }>

      <div>
        Title:
        <input
          value={ title }
          onChange={ handleTitleChange }
        />
      </div>

      <div>
        Author:
        <input
          value={ author }
          onChange={ handleAuthorChange }
        />
      </div>

      <div>
        URL:
        <input
          value={ url }
          onChange={ handleUrlChange }
        />
      </div>

      <button type="submit">Create</button>

    </form>
  </>
  )
}

export default NewBlogForm