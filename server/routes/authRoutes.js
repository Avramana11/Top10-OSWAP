import { Router } from 'express'
import { register, login, profile } from '../controllers/authController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/profile', authMiddleware, profile)

export default router
