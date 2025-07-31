import { useState, useEffect } from 'react'
import personService from './services/persons'
import NumberForm from './components/NumberForm'
import Filter from './components/Filter'
import PersonList from './components/PersonList'


const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const filteredPersons = persons.filter((person) => person.name.includes(nameFilter))

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    const invalidPhoneNumberPattern = /[^\d-]/ // includes any character other than a digit or -
    if (invalidPhoneNumberPattern.test(event.target.value)) {
      alert("Phone number can only include digits or '-'.")
    } else {
      setNewNumber(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <NumberForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} />
    </div>
  )
}

export default App