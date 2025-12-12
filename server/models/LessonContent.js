import mongoose from 'mongoose'

const quizQuestionSchema = new mongoose.Schema({
  q: { type: String, required: true },
  options: { type: [String], required: true },
  a: { type: Number, required: true },
  order: { type: Number, required: true },
})

const lessonContentSchema = new mongoose.Schema({
  lessonId: { type: String, unique: true, required: true },
  path: { type: String, required: true },
  concepts: { type: [String], default: [] },
  quizQuestions: { type: [quizQuestionSchema], default: [] },
})

export const LessonContent = mongoose.model('LessonContent', lessonContentSchema)

