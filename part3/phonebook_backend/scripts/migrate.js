import 'dotenv/config'

import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
const old_url = process.env.OLD_MONGODB_URI
const new_url = process.env.NEW_MONGODB_URI

const migrate = async () => {
  await mongoose.connect(old_url)
  console.log('Succesfully connected to database.')


  const isValidNumber = (number) => {
    // todo: change to only regex
    if (/[^\d-]/.test(number)) {
      return false
    }
    if (number.length < 8) {
      return false
    }
    if (number.split('-').length !== 2) {
      return false
    }
    if (!(number[2] === '-') && !(number[3] === '-')) {
      return false
    }
    return true
  }

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minLength: 3
    },
    number: {
      type: String,
      required: true,
      validate: {
        validator: isValidNumber,
        message: props => `${props.value} is not a valid phone number.`
      }
    }
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = String(document._id)
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const NewPerson = mongoose.model('Person', personSchema)


  const personList = await NewPerson.find({})



  for (let person of personList) {
    const deletedPerson = await NewPerson.findByIdAndDelete(person.id)
    console.log(`Succesfully deleted ${deletedPerson}`)
  }

  await mongoose.connection.close()

  await mongoose.connect(new_url)
  console.log('Succesfully connected to database.')


  for (let person of personList) {
    const newPerson = new NewPerson({
      name: person.name,
      number: person.number
    })
    const result = await newPerson.save()
    console.log(`Succesfully saved ${result.name} to the new database`)
  }
}

migrate()