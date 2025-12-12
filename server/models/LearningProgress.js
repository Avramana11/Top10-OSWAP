import mongoose from 'mongoose'

const learningProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  path: { type: String, required: true },
  completedLessons: { type: [String], default: [] },
  lastLesson: { type: String, default: null },
  progressPercent: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
})

export const LearningProgress = mongoose.model('LearningProgress', learningProgressSchema)

