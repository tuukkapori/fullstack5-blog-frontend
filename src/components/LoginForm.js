import React from 'react'

const LoginForm = ({ username, password, handleLogin, handleChange }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label>username</label>
        <input type="text" id="username" name="username" value={username} onChange={handleChange}></input><br/>
        <label>password</label>
        <input type="password" id="password" name="password" value={password} onChange={handleChange}></input><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
