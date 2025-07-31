import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  return axios.get(baseUrl)
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = (personToDelete) => {
  return axios.delete(`${baseUrl}/${personToDelete.id}`)
}

export default { 
  getAllPersons,
  createPerson,
  deletePerson
}