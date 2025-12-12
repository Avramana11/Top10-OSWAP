import mongoose from 'mongoose'

const lessonMetaSchema = new mongoose.Schema({
  lessonId: { type: String, unique: true, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  path: { type: String, required: true, trim: true },
  order: { type: Number, required: true },
})

export const LessonMeta = mongoose.model('LessonMeta', lessonMetaSchema)

