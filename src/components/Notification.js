import React from 'react'
const Notification = ({ message }) => {

  var positive = true

  if (message.split(', ')[1] === 'error'){
    positive = false
  }




  return (
    <div style={{ color: positive ? 'green' : 'red' }}>
      {message.split(', ')[0]}
    </div>
  )
}

export default Notification
