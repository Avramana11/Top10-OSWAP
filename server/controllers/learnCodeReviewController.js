import { LessonMeta } from '../models/LessonMeta.js'
import { LearningProgress } from '../models/LearningProgress.js'
import { QuizResult } from '../models/QuizResult.js'

const PATH = 'code-review'
const LESSONS = [
  { lessonId: 'cr-1', title: 'Introduction to Secure Code Review', order: 1 },
  { lessonId: 'cr-2', title: 'SQL Injection Patterns', order: 2 },
  { lessonId: 'cr-3', title: 'XSS Detection Patterns', order: 3 },
  { lessonId: 'cr-4', title: 'Authentication & Authorization Mistakes', order: 4 },
]

const ensureLessonMeta = async () => {
  const count = await LessonMeta.countDocuments({ path: PATH })
  if (count === LESSONS.length) return
  for (const l of LESSONS) {
    await LessonMeta.updateOne({ lessonId: l.lessonId }, { $set: { ...l, path: PATH } }, { upsert: true })
  }
}

const calcProgress = (completed) => {
  const total = LESSONS.length
  const set = new Set(completed)
  const pct = Math.round(((set.size / total) * 100))
  return Math.min(100, Math.max(0, pct))
}

export const getCodeReviewProgress = async (req, res) => {
  await ensureLessonMeta()
  const userId = req.user.sub
  let progress = await LearningProgress.findOne({ userId, path: PATH })
  if (!progress) {
    progress = await LearningProgress.create({ userId, path: PATH, completedLessons: [], lastLesson: null, progressPercent: 0 })
  }
  const lessons = await LessonMeta.find({ path: PATH }).sort({ order: 1 }).select('lessonId title order path')
  res.json({ lessons, progress })
}

export const completeCodeReviewLesson = async (req, res) => {
  const userId = req.user.sub
  const lessonId = String((req.body || {}).lessonId || '')
  const ok = LESSONS.some((l) => l.lessonId === lessonId)
  if (!ok) return res.status(400).json({ error: 'invalid_lesson' })
  let progress = await LearningProgress.findOne({ userId, path: PATH })
  if (!progress) progress = await LearningProgress.create({ userId, path: PATH })
  const nextCompleted = Array.from(new Set([...(progress.completedLessons || []), lessonId]))
  const pct = calcProgress(nextCompleted)
  progress.completedLessons = nextCompleted
  progress.lastLesson = lessonId
  progress.progressPercent = pct
  progress.updatedAt = new Date()
  await progress.save()
  res.json({ progress })
}

const CORRECT_ANSWERS = {
  'cr-1': [0, 0, 0],
  'cr-2': [1, 0, 1],
  'cr-3': [2, 0, 1],
  'cr-4': [0, 2, 1],
}

export const submitCodeReviewQuiz = async (req, res) => {
  const userId = req.user.sub
  const body = req.body || {}
  const lessonId = String(body.lessonId || '')
  const answers = Array.isArray(body.answers) ? body.answers.map((n) => Number(n)) : []
  const ok = LESSONS.some((l) => l.lessonId === lessonId)
  if (!ok) return res.status(400).json({ error: 'invalid_input' })
  const correct = CORRECT_ANSWERS[lessonId] || []
  const total = correct.length
  let score = 0
  for (let i = 0; i < total; i++) {
    if (answers[i] === correct[i]) score++
  }
  const existing = await QuizResult.findOne({ userId, lessonId })
  if (existing) {
    existing.score = score
    existing.total = total
    existing.attempts = (existing.attempts || 0) + 1
    existing.answers = answers
    existing.submitted = true
    existing.updatedAt = new Date()
    await existing.save()
    return res.json({ result: existing })
  }
  const result = await QuizResult.create({ userId, lessonId, score, total, attempts: 1, answers, submitted: true })
  res.json({ result })
}

