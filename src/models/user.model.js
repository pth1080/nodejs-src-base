import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

UserSchema.pre('save', function (cb) {
  const user = this
  console.log('UserSchema Pre Save')
  if (!user.isModified('password')) return cb()
  console.log('co thay doi nek')

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return cb(err)

    bcrypt.hash(user.password, salt, (hashErr, hash) => {
      if (hashErr) return cb(hashErr)
      user.password = hash
      cb()
    })
  })
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err)
      return resolve(isMatch)
    })
  })
}
UserSchema.index({
  'username': 'text'
})
const UserModel = mongoose.model('User', UserSchema)
export default UserModel
