import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { getReviews, createReview, updateReview, deleteReview } from '../controllers/reviewController.js'

const router = Router()

router.get('/reviews', getReviews)
router.post('/reviews', authMiddleware, createReview)
router.put('/reviews/:id', authMiddleware, updateReview)
router.delete('/reviews/:id', authMiddleware, deleteReview)

export default router

