import mongoose from 'mongoose'

const quizResultSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  lessonId: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  attempts: { type: Number, default: 0 },
  answers: { type: [Number], default: [] },
  submitted: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now },
})

export const QuizResult = mongoose.model('QuizResult', quizResultSchema)

