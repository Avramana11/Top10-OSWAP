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
// app.use(cors({ origin: ['http://localhost:8080'], credentials: true }))
app.use(cors({
  origin: "*",
  credentials: true
}));
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

// We attempt to connect but start the server anyway to avoid 404s in development
connectDB()
  .then(() => {
    process.stdout.write('Connected to MongoDB successfully\n')
  })
  .catch((err) => {
    process.stderr.write(`Warning: Failed to connect DB: ${err?.message || err}\n`)
    process.stderr.write('Continuing to start server anyway...\n')
  })
  .finally(() => {
    app.listen(port, () => {
      process.stdout.write(`API listening on http://localhost:${port}\n`)
    })
  })                              
