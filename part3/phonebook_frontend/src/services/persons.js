import axios from 'axios'
const baseUrl = '/api/persons'

const getAllPersons = () => {
  return axios.get(baseUrl)
}

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const deletePerson = (personToDelete) => {
  return axios.delete(`${baseUrl}/${personToDelete.id}`)
}

const changeNumber = (personToChange, newNumber) => {
  return axios.put(`${baseUrl}/${personToChange.id}`, {...personToChange, number: newNumber})
}

export default { 
  getAllPersons,
  createPerson,
  deletePerson,
  changeNumber
}