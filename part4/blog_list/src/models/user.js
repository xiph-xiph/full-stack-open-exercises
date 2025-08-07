import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id
    delete returnedObject.passwordHash
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const User = mongoose.model('User', userSchema)
export default User