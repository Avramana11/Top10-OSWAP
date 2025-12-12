import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret'

export const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization || ''
  const parts = auth.split(' ')
  if (parts.length === 2 && parts[0] === 'Bearer') {
    try {
      const payload = jwt.verify(parts[1], JWT_SECRET)
      req.user = payload
      return next()
    } catch (e) {}
  }
  return res.status(401).json({ error: 'unauthorized' })
}

export const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'unauthorized' })
  if (req.user.role !== role) return res.status(403).json({ error: 'forbidden' })
  next()
}
