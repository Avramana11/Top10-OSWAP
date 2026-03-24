import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'
import { isValidUsername, isStrongPassword, isValidEmail, sanitize } from '../utils/validators.js'

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'
const JWT_EXPIRES_IN = '2h'

const signToken = (user) => jwt.sign({ sub: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

export const register = async (req, res) => {
  const { username, email, password, role } = req.body || {}
  if (!username || !email || !password) return res.status(400).json({ error: 'invalid_input' })
  const u = sanitize(username)
  const e = sanitize(email).toLowerCase()
  const p = String(password)
  if (!isValidUsername(u)) return res.status(400).json({ error: 'invalid_username' })
  if (!isValidEmail(e)) return res.status(400).json({ error: 'invalid_email' })
  if (!isStrongPassword(p)) return res.status(400).json({ error: 'weak_password' })
  const existsUser = await User.findOne({ username: u })
  if (existsUser) return res.status(409).json({ error: 'username_taken' })
  const existsEmail = await User.findOne({ email: e })
  if (existsEmail) return res.status(409).json({ error: 'email_taken' })
  const passwordHash = bcrypt.hashSync(p, 10)
  const doc = await User.create({ username: u, email: e, passwordHash, role: role === 'admin' ? 'admin' : 'user' })
  const safeUser = { id: doc.id, username: doc.username, role: doc.role, createdAt: doc.createdAt }
  const token = signToken(safeUser)
  res.json({ token, user: safeUser })
}

export const login = async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'invalid_input' })
  const e = sanitize(email).toLowerCase()
  const doc = await User.findOne({ email: e })
  if (!doc) return res.status(401).json({ error: 'invalid_credentials' })
  const ok = bcrypt.compareSync(String(password), doc.passwordHash)
  if (!ok) return res.status(401).json({ error: 'invalid_credentials' }) 
  const safeUser = { id: doc.id, username: doc.username, role: doc.role }
  const token = signToken(safeUser)
  res.json({ token, user: safeUser })
}

export const profile = async (req, res) => {
  const doc = await User.findById(req.user.sub).select('username role createdAt')
  if (!doc) return res.status(404).json({ error: 'not_found' })
  res.json({ user: doc })
}
