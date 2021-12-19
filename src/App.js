import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import LoginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const [message, setMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log('logging in')

    try {
      const user = await LoginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('wrong credentials')
      showMessage('wrong username or password', 'error')
      setUsername('')
      setPassword('')
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    e.target.id === 'username'
      ? setUsername(e.target.value)
      : setPassword(e.target.value)
  }

  const getBlogs = () => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog.data)
      setBlogs(blogs.concat(returnedBlog.data))
      showMessage('new blog created', 'success')
    } catch (error) {
      showMessage('error happened', 'error')
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  const showMessage = (notificatonMessage, type) => {
    setMessage(`${notificatonMessage}, ${type}`)
    setTimeout(() => {
      setMessage('')
    }, 4000)
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleChange={handleChange}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="Create a new post" ref={blogFormRef}>
        <CreateBlog
          getBlogs={getBlogs}
          showMessage={showMessage}
          createNewBlog={createNewBlog}
        />
      </Togglable>
    )
  }

  const deleteall = async () => {
    await blogService.deleteAll()
    setBlogs([])
  }

  const deleteBlog = async (id) => {
    if (
      window.confirm(
        `Delete blog '${blogs.find((blog) => blog.id === id).title}'`
      )
    ) {
      try {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
        showMessage('Blog deleted succesfully', 'success')
      } catch (error) {
        console.log('oops')
      }
    }
  }

  return (
    <div className="app">
      <h1>Blog app</h1>
      <button onClick={deleteall}>DELETE ALL Blogs</button>
      {user === null ? (
        loginForm()
      ) : (
        <div className="app-lower">
          <Notification message={message} />
          <h3>{user.username} logged in</h3>
          <button onClick={logOut}>Log out</button>
          {blogForm()}

          <BlogList blogs={blogs} deleteBlog={deleteBlog} />
        </div>
      )}
    </div>
  )
}

export default App
