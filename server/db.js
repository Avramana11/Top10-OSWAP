import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/owasp_academy'
await mongoose.connect(uri)

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
})

userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

const User = mongoose.model('User', userSchema)

const getUserByUsername = async (username) => User.findOne({ username }).exec()
const getUserById = async (id) => User.findById(id).select('username role createdAt').exec()

const createUser = async (username, password, role = 'user') => {
  const existing = await getUserByUsername(username)
  if (existing) return null
  const passwordHash = bcrypt.hashSync(password, 10)
  const user = await User.create({ username, passwordHash, role })
  return { id: user.id, username: user.username, role: user.role, createdAt: user.createdAt }
}

const ensureSeedUser = async () => {
  const count = await User.countDocuments()
  if (count === 0) {
    await createUser('admin', 'ChangeMe123!', 'admin')
  }
}

await ensureSeedUser()

export { mongoose, User, getUserByUsername, getUserById, createUser }
