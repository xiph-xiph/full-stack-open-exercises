import mongoose from "mongoose"

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI


mongoose.connect(url)
  .then((response) => {
    console.log("Succesfully connected to database.")
  })
  .catch((error) => {
    console.log(`Could not connect to database: ${error}`)
    process.exit(1)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true }
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