import { LessonMeta } from '../models/LessonMeta.js'
import { LearningProgress } from '../models/LearningProgress.js'
import { QuizResult } from '../models/QuizResult.js'
import { LessonContent } from '../models/LessonContent.js'

const PATH = 'beginner'
const LESSONS = [
  { lessonId: 'lesson-1', title: 'What is Web Security & OWASP', order: 1 },
  { lessonId: 'lesson-2', title: 'How Web Attacks Work', order: 2 },
  { lessonId: 'lesson-3', title: 'Core Security Concepts', order: 3 },
  { lessonId: 'lesson-4', title: 'OWASP Top 10 Overview', order: 4 },
  { lessonId: 'lesson-5', title: 'Using Vulnerable vs Secure Demos', order: 5 },
]

const ensureLessonMeta = async () => {
  const count = await LessonMeta.countDocuments({ path: PATH })
  if (count === LESSONS.length) return
  for (const l of LESSONS) {
    await LessonMeta.updateOne({ lessonId: l.lessonId }, { $set: { ...l, path: PATH } }, { upsert: true })
  }
}

const ensureLessonContent = async () => {
  const exists = await LessonContent.countDocuments({ path: PATH })
  if (exists === LESSONS.length) return
  const seed = {
    'lesson-1': {
      concepts: [
        'Security protects users, data, and systems from harm.',
        'OWASP curates community-driven practices and common risks.',
        'Foundations: threats, vulnerabilities, and controls.',
      ],
      quiz: [
        { q: 'OWASP focuses on what domain?', options: ['Web security', 'Image processing', 'UI design'], a: 0 },
        { q: 'Security aims to protect what?', options: ['Systems and users', 'Only passwords', 'Frontend styles'], a: 0 },
        { q: 'A vulnerability is?', options: ['A weakness', 'A user', 'A server'], a: 0 },
        { q: 'A threat is?', options: ['Potential cause of harm', 'A database', 'A stylesheet'], a: 0 },
        { q: 'A control is?', options: ['Protective measure', 'Bug report', 'Theme'], a: 0 },
        { q: 'Risk combines?', options: ['Likelihood and impact', 'Color and font', 'IP and port'], a: 0 },
        { q: 'Principle of secure design?', options: ['Fail securely', 'No logging', 'Trust all inputs'], a: 0 },
      ],
    },
    'lesson-2': {
      concepts: [
        'Attacks exploit trust boundaries and poor validation.',
        'Common vectors: injection, XSS, auth abuse.',
        'Recon → exploit → persist → exfiltrate.',
      ],
      quiz: [
        { q: 'Attacks often abuse what?', options: ['Trust boundaries', 'Color palettes', 'CDN caching'], a: 0 },
        { q: 'Input validation helps mitigate?', options: ['Injection', 'Animations', 'Layout'], a: 0 },
        { q: 'XSS targets?', options: ['Browsers', 'Routers', 'Keyboards'], a: 0 },
        { q: 'Auth abuse includes?', options: ['Credential stuffing', 'Image resizing', 'CSS bugs'], a: 0 },
        { q: 'Enumeration reveals?', options: ['Valid accounts/objects', 'CSS variables', 'Cache keys'], a: 0 },
        { q: 'SSRF pivots?', options: ['Server to internal resources', 'Client theme', 'Font size'], a: 0 },
        { q: 'Defense-in-depth adds?', options: ['Layers of controls', 'More colors', 'Fewer logs'], a: 0 },
      ],
    },
    'lesson-3': {
      concepts: [
        'Least privilege: minimize permissions to reduce blast radius.',
        'Validate and sanitize inputs everywhere.',
        'Secure defaults and hardening reduce exposures.',
      ],
      quiz: [
        { q: 'Least privilege reduces?', options: ['Blast radius', 'CPU usage', 'Bandwidth'], a: 0 },
        { q: 'Defense in depth means?', options: ['Multiple layers', 'Single control', 'No logging'], a: 0 },
        { q: 'Secure defaults imply?', options: ['Deny by default', 'Allow all', 'Ignore errors'], a: 0 },
        { q: 'Sanitize inputs to prevent?', options: ['Injection', 'Accessibility', 'SEO'], a: 0 },
        { q: 'RBAC stands for?', options: ['Role-Based Access Control', 'Random Binary Access Cache', 'Remote Backup and Copy'], a: 0 },
        { q: 'Hash passwords using?', options: ['bcrypt/Argon2', 'md5', 'plaintext'], a: 0 },
        { q: 'Transport security enforces?', options: ['HTTPS/TLS', 'HTTP only', 'FTP'], a: 0 },
      ],
    },
    'lesson-4': {
      concepts: [
        'OWASP Top 10 highlights common risk categories.',
        'Use it to prioritize remediation and education.',
      ],
      quiz: [
        { q: 'OWASP Top 10 lists?', options: ['Common risks', 'Programming languages', 'UI patterns'], a: 0 },
        { q: 'IDOR is part of?', options: ['Broken Access Control', 'Cryptographic Failures', 'Vulnerable Components'], a: 0 },
        { q: 'Injection includes?', options: ['NoSQL/SQL/Command', 'SVG', 'CSS'], a: 0 },
        { q: 'Security misconfiguration example?', options: ['Missing headers', 'Rounded corners', 'Dark theme'], a: 0 },
        { q: 'Vulnerable components risk comes from?', options: ['Outdated libs', 'New fonts', 'Extra spacing'], a: 0 },
        { q: 'Logging failures impact?', options: ['Detection/response', 'Color grading', 'Animations'], a: 0 },
        { q: 'SSRF abuses?', options: ['Server-side fetches', 'Client-side CSS', 'CDN images'], a: 0 },
      ],
    },
    'lesson-5': {
      concepts: [
        'Compare weak vs strong demos to understand controls.',
        'Policies: allowlists, protocol checks, rate limits.',
      ],
      quiz: [
        { q: 'Secure demos illustrate?', options: ['Preventive controls', 'Themes', 'Marketing copy'], a: 0 },
        { q: 'Allowlisting constrains?', options: ['Destinations/inputs', 'Fonts', 'Breakpoints'], a: 0 },
        { q: 'Rate limiting mitigates?', options: ['Brute force', 'Layout shifts', 'Caching'], a: 0 },
        { q: 'Error handling should?', options: ['Avoid info leaks', 'Expose stack', 'Log passwords'], a: 0 },
        { q: 'Key management should?', options: ['Rotate/secure keys', 'Hardcode keys', 'Ignore keys'], a: 0 },
        { q: 'TLS/HSTS enforce?', options: ['Transport security', 'Image compression', 'Shadow DOM'], a: 0 },
        { q: 'Validation reduces?', options: ['Exploit surface', 'Typography issues', 'UX friction'], a: 0 },
      ],
    },
  }
  for (const l of LESSONS) {
    const s = seed[l.lessonId]
    const quiz = (s.quiz || []).map((q, i) => ({ ...q, order: i + 1 }))
    await LessonContent.updateOne(
      { lessonId: l.lessonId },
      { $set: { lessonId: l.lessonId, path: PATH, concepts: s.concepts, quizQuestions: quiz } },
      { upsert: true }
    )
  }
}

const calcProgress = (completed) => {
  const total = LESSONS.length
  const set = new Set(completed)
  const pct = Math.round(((set.size / total) * 100))
  return Math.min(100, Math.max(0, pct))
}

export const getBeginnerProgress = async (req, res) => {
  await ensureLessonMeta()
  await ensureLessonContent()
  const userId = req.user.sub
  let progress = await LearningProgress.findOne({ userId, path: PATH })
  if (!progress) {
    progress = await LearningProgress.create({ userId, path: PATH, completedLessons: [], lastLesson: null, progressPercent: 0 })
  }
  const lessons = await LessonMeta.find({ path: PATH }).sort({ order: 1 }).select('lessonId title order path')
  res.json({ lessons, progress })
}

export const getLessonContent = async (req, res) => {
  await ensureLessonContent()
  const { lessonId } = req.params
  const ok = LESSONS.some((l) => l.lessonId === lessonId)
  if (!ok) return res.status(400).json({ error: 'invalid_lesson' })
  const doc = await LessonContent.findOne({ lessonId, path: PATH }).select('lessonId concepts quizQuestions')
  res.json({ content: doc })
}

export const completeBeginnerLesson = async (req, res) => {
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

export const submitBeginnerQuiz = async (req, res) => {
  const userId = req.user.sub
  const body = req.body || {}
  const lessonId = String(body.lessonId || '')
  const answers = Array.isArray(body.answers) ? body.answers.map((n) => Number(n)) : []
  const ok = LESSONS.some((l) => l.lessonId === lessonId)
  if (!ok) return res.status(400).json({ error: 'invalid_input' })
  const content = await LessonContent.findOne({ lessonId, path: PATH })
  if (!content) return res.status(400).json({ error: 'invalid_lesson' })
  const total = content.quizQuestions.length
  let score = 0
  for (let i = 0; i < total; i++) {
    const correct = content.quizQuestions[i]?.a
    if (answers[i] === correct) score++
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

export const getQuizResult = async (req, res) => {
  const userId = req.user.sub
  const { lessonId } = req.params
  const doc = await QuizResult.findOne({ userId, lessonId })
  res.json({ result: doc })
}

export const resetBeginnerProgress = async (req, res) => {
  const userId = req.user.sub
  let progress = await LearningProgress.findOne({ userId, path: PATH })
  if (!progress) progress = await LearningProgress.create({ userId, path: PATH })
  progress.completedLessons = []
  progress.lastLesson = null
  progress.progressPercent = 0
  progress.updatedAt = new Date()
  await progress.save()
  res.json({ progress })
}

export const resetLessonQuiz = async (req, res) => {
  const userId = req.user.sub
  const { lessonId } = req.body || {}
  if (!lessonId) return res.status(400).json({ error: 'invalid_input' })
  await QuizResult.deleteOne({ userId, lessonId })
  res.json({ ok: true })
}
