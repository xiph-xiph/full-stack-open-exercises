import mongoose from 'mongoose'


const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  passwordHash: {
    type: String
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