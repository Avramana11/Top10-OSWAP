import { Router } from 'express'
import mongoose from 'mongoose'

const router = Router()

router.get('/health', (req, res) => {
  const ready = mongoose.connection.readyState // 0=disconnected,1=connected,2=connecting,3=disconnecting
  const map = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' }
  res.json({ db: map[ready] })
})

export default router
