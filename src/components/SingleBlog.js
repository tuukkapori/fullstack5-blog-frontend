import React, { useState } from 'react'
import blogService from '../services/blogs'

const SingleBlog = ({ blog, deleteBlog, addLike }) => {
  const [thisBlog, setThisBlog] = useState(blog)

  const [isOpen, setIsOpen] = useState(false)
  const [alreadyLiked, setAlreadyLiked] = useState(false)

  const inlineaddLike = async () => {
    const updatedBlog = {
      ...thisBlog,
      likes: alreadyLiked ? thisBlog.likes - 1 : thisBlog.likes + 1,
    }
    try {
      await blogService.update(blog.id, updatedBlog)
      setThisBlog(updatedBlog)
      setAlreadyLiked(!alreadyLiked)
    } catch (error) {
      console.log('error, could not like')
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <h3>{thisBlog.title}</h3>
        <p>by: {thisBlog.author}</p>
        <button
          id="show-more-btn"
          className="show-more-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          show {isOpen ? ' less' : ' more'}
        </button>
      </div>
      {!isOpen ? null : (
        <div>
          <p>url: {thisBlog.url}</p>
          <p>likes: {thisBlog.likes}</p>
          <button id="like-btn" onClick={addLike}>
            {alreadyLiked ? 'unlike' : 'like'}
          </button>

          <button onClick={() => deleteBlog(thisBlog.id)}>
            Delete this post
          </button>
          <button id="fakelike" onClick={inlineaddLike}></button>
        </div>
      )}
    </>
  )
}

export default SingleBlog
