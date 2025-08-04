import mongoose from 'mongoose'

if (process.argv.length < 3) {
  console.log("Usage: node mongo.js <password> [<name> <number>]")
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://pjotr:${password}@cluster0.eoapdes.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true }
})

const Person = mongoose.model('person', personSchema)

const newPerson = new Person({
  name: personName,
  number: personNumber
})

if (personNumber) {
  newPerson.save()
    .then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
  Person.find({})
    .then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    })
}