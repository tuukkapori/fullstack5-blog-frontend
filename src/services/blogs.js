import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  console.log(token)
  const config = {
    headers: { Authorization: token }
  }

  console.log(config)

  const response = await axios.post(baseUrl, newBlog, config)
  console.log(response)
  return response
}

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

const deleteAll = async () => {
  await axios.delete('/api/delete/deleteall')
  console.log('everything should be deleted')
}

const update = (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlog)
  return request.then(res => res.data)
}

export default { getAll, create, update, setToken, deleteBlog, deleteAll }