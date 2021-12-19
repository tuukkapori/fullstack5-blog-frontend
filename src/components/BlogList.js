import React from 'react'
import SingleBlog from './SingleBlog'

const BlogList = ({ blogs, deleteBlog }) => {
  return (
    <ul className="blogs-ul">
      {blogs.map((blog) => (
        <li className="single-blog" key={blog.id}>
          <SingleBlog deleteBlog={deleteBlog} blog={blog} />
        </li>
      ))}
    </ul>
  )
}

export default BlogList
