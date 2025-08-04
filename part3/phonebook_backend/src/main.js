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

app.get('/info', (request, response, next) => {
  Person.find({})
    .then(result => {
      response.send(`<div>Phonebook has info for ${result.length} people</div> <div>${new Date()}</div>`)
    })
    .catch(error => next(error))
    
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
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
        .catch(error => next(error))
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((foundPerson) => {
      if (!foundPerson) {
        response.status(404).end()
        return
      }
      response.json(foundPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, {number: request.body.number}, {new: true})
    .then((updatedPerson) => {
      if (!updatedPerson) {
        response.status(404).end()
        return
      }
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((deletedPerson) => {
      if (!deletedPerson) {
        response.status(404).end()
        return
      }
      response.json(deletedPerson)
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is now running on port ${PORT}`)
})