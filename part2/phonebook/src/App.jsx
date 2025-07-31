import { useState, useEffect } from 'react'
import personService from './services/persons'
import NumberForm from './components/NumberForm'
import Filter from './components/Filter'
import PersonList from './components/PersonList'
import FeedbackMessage from './components/FeedbackMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackIsError, setFeedbackError] = useState(false)

  useEffect(() => {
    personService
      .getAllPersons()
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

    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook! Do you want to replace the old number with the new one?`)) {
        personService
          .changeNumber(existingPerson, newNumber)
          .then((response) => {
            setPersons(persons.map((person) =>
              person.id !== existingPerson.id ? person : response.data
            ))
            setNewName('')
            setNewNumber('')
            setFeedbackMessage(`Changed ${existingPerson.name}'s number to ${response.data.number}.`)
            setFeedbackError(false)
            setTimeout(() => {
              setFeedbackMessage('')
            }, 1500)
          })
          .catch((error) => {
            setFeedbackMessage(`${existingPerson.name} was already removed from the phonebook`)
            setFeedbackError(true)
            setTimeout(() => {
              setFeedbackMessage('')
            }, 1500)
            setPersons(persons.filter((person) =>
              person.id !== existingPerson.id
            ))
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .createPerson(newPerson)
      .then((response) => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setFeedbackMessage(`Added ${response.data.name} to the phonebook.`)
        setFeedbackError(false)
        setTimeout(() => {
          setFeedbackMessage('')
        }, 1500);
      })

  }

  const handleDelete = (personToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${personToDelete.name} from the phonebook?`)) {
      personService
        .deletePerson(personToDelete)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== response.data.id))
          setFeedbackMessage(`Removed ${response.data.name} from the phonebook.`)
          setFeedbackError(false)
          setTimeout(() => {
            setFeedbackMessage('')
          }, 1500);
        })
        .catch((error) => {
          setFeedbackMessage(`${personToDelete.name} was already removed from the phonebook`)
          setFeedbackError(true)
          setTimeout(() => {
            setFeedbackMessage('')
          }, 1500)
          setPersons(persons.filter((person) =>
            person.id !== personToDelete.id
          ))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FeedbackMessage message={feedbackMessage} isError={feedbackIsError} />
      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new number</h2>
      <NumberForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <PersonList persons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App