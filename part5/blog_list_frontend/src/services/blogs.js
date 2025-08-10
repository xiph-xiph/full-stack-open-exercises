import axios from 'axios'
const baseUrl = '/api/blogs'

let token
const setToken = newToken => {
  token = `Bearer ${newToken}`
} 

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async newObject => {
  const config = {
    headers: { Authorization: token}
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (error) {
    if (error.name === 'AxiosError') {
      console.log(error?.response?.data?.error)
      return null
    }
  }

}

export default { setToken, getAll, addNew }