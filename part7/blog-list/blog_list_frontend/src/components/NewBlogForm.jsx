import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const NewBlogForm = ({ addBlogToList, setNotification, closeForm }) => {
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
    try {
      const createdBlog = await blogService.addNew({ title, author, url })
      addBlogToList(createdBlog)
      setNotification(`New blog "${ title }" by ${ author } added.`)
      closeForm()
    } catch (error) {
      setNotification(error.response?.data?.error, true)
    }
  }

  return (
    <>
      <form onSubmit={ handleSubmit }>

        <div>
          Title:
          <input className='titleInput'
            value={ title }
            onChange={ handleTitleChange }
          />
        </div>

        <div>
          Author:
          <input className='authorInput'
            value={ author }
            onChange={ handleAuthorChange }
          />
        </div>

        <div>
          URL:
          <input className='urlInput'
            value={ url }
            onChange={ handleUrlChange }
          />
        </div>

        <button type="submit" className='submitButton' >Create</button>

      </form>

      <button onClick={ closeForm }>Cancel</button>
    </>
  )
}

NewBlogForm.propTypes = {
  addBlogToList: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  closeForm: PropTypes.func.isRequired
}

export default NewBlogForm