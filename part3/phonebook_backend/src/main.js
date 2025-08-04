import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import Person from './models/person.js'

const app = express()

app.use(express.json())
app.use(express.static('dist'))

const logger = morgan((tokens, request, response) => (
  [
    tokens.method(request, response),
    tokens.url(request, response),
    tokens.status(request, response),
    tokens.res(request, response, 'content-length'), '-',
    tokens['response-time'](request, response), 'ms',
    JSON.stringify(request.body)
  ].join(' ')
))

app.use(logger)

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
  Person.find({})
    .then(result => {
      response.json(result)
    })
})

app.post('/api/persons', (request, response) => {
  if (!request.body.name || !request.body.number) {
    response.status(400).json({error: "Request must include both a name and a number"})
    return
  }
  Person.findOne({ name: request.body.name})
    .then(result => {
      if (result) {
        response.status(400).json({error: `${request.body.name} is already in the phonebook`})
        return
      }
      const newPerson = new Person({
        name: request.body.name,
        number: request.body.number
      })
      newPerson.save()
        .then(result => {
          response.json(result)
        })
    })
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
  Person.findByIdAndDelete(request.params.id)
    .then((dbResponse) => {
      if (!dbResponse) {
        response.status(404).end()
        return
      }
      response.json(dbResponse)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`)
})