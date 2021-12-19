import React, { useState } from 'react'

const CreateBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const resetInputs = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleChange = (e) => {
    if (e.target.id === 'title') {
      setTitle(e.target.value)
    } else if (e.target.id === 'author') {
      setAuthor(e.target.value)
    } else {
      setUrl(e.target.value)
    }
  }

  const create = (e) => {
    e.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    console.log('tällane on uusi blog', newBlogObject)
    createNewBlog(newBlogObject)

    resetInputs()
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={create}>
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            onChange={handleChange}
            value={title}
          ></input>
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            onChange={handleChange}
            value={author}
          ></input>
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            type="text"
            onChange={handleChange}
            value={url}
          ></input>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateBlog
