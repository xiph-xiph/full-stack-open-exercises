import { useState } from 'react'
import NumberForm from './components/NumberForm'
import Filter from './components/Filter'
import PersonList from './components/PersonList'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [nameFilter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add new number</h2>
      <NumberForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons}/>
    </div>
  )
}

export default App