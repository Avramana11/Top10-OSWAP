import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import healthRoutes from './routes/healthRoutes.js'
import learnBeginnerRoutes from './routes/learnBeginnerRoutes.js'
import learnCodeReviewRoutes from './routes/learnCodeReviewRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import { authMiddleware, requireRole } from './middleware/auth.js'
import { connectDB } from './config/db.js'

const app = express()
app.use(cors({ origin: ['http://localhost:8080'], credentials: false }))
app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', healthRoutes)
app.use('/api', learnBeginnerRoutes)
app.use('/api', learnCodeReviewRoutes)
app.use('/api', reviewRoutes)

app.get('/api/admin/stats', authMiddleware, requireRole('admin'), (req, res) => {
  res.json({ status: 'ok', message: 'admin-only endpoint' })
})

const port = process.env.PORT || 3000
connectDB()
  .then(() => {
    app.listen(port, () => {
      process.stdout.write(`API listening on http://localhost:${port}\n`)
    })
  })
  .catch((err) => {
    process.stderr.write(`Failed to connect DB: ${err?.message || err}\n`)
    process.exit(1)
  })
