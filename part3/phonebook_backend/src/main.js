import express from 'express'

const app = express()

app.use(express.json())

const persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/info', (request, response) => {
  response.send(`<div>Phonebook has info for ${persons.length} people</div> <div>${new Date()}</div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  let id = Math.floor(Math.random() * 1000000000)
  persons.push({...request.body, id: id})
  response.json(request.body)
})

app.get('/api/persons/:id', (request, response) => {
  const foundPerson = persons.find((person) => person.id === request.params.id)
  if (!foundPerson) {
    response.status(404).end()
    return
  }
  response.json(foundPerson)
})

app.delete('/api/persons/:id', (request, response) => {
  const indexToDelete = persons.findIndex((person) => person.id === request.params.id)
  if (indexToDelete === -1) {
    response.status(404).end()
    return
  }
  persons.splice(indexToDelete, 1)
  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`)
})