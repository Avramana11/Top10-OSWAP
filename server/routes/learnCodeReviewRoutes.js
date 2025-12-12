import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { getCodeReviewProgress, completeCodeReviewLesson, submitCodeReviewQuiz } from '../controllers/learnCodeReviewController.js'

const router = Router()

router.get('/learn/code-review/progress', authMiddleware, getCodeReviewProgress)
router.post('/learn/code-review/complete', authMiddleware, completeCodeReviewLesson)
router.post('/learn/code-review/quiz', authMiddleware, submitCodeReviewQuiz)

export default router

