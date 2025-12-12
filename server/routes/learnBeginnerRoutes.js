import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { getBeginnerProgress, getLessonContent, completeBeginnerLesson, submitBeginnerQuiz, getQuizResult, resetBeginnerProgress, resetLessonQuiz } from '../controllers/learnBeginnerController.js'

const router = Router()

router.get('/learn/beginner/progress', authMiddleware, getBeginnerProgress)
router.get('/learn/beginner/lesson/:lessonId', authMiddleware, getLessonContent)
router.post('/learn/beginner/complete', authMiddleware, completeBeginnerLesson)
router.post('/learn/beginner/quiz', authMiddleware, submitBeginnerQuiz)
router.get('/learn/beginner/quiz/:lessonId', authMiddleware, getQuizResult)
router.post('/learn/beginner/reset-progress', authMiddleware, resetBeginnerProgress)
router.post('/learn/beginner/reset-quiz', authMiddleware, resetLessonQuiz)

export default router
