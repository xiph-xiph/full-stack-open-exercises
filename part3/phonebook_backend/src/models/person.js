import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI


mongoose.connect(url)
  .then(() => {
    console.log('Succesfully connected to database.')
  })
  .catch((error) => {
    console.log(`Could not connect to database: ${error}`)
    process.exit(1)
  })

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

const Person = mongoose.model('Person', personSchema)
export default Person