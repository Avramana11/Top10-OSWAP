import mongoose from 'mongoose'
import { Review } from '../models/review.js'
import { sanitize } from '../utils/validators.js'

export const getReviews = async (req, res) => {
  const docs = await Review.find({}).sort({ createdAt: -1 }).lean()
  res.json({ reviews: docs })
}

export const createReview = async (req, res) => {
  const uid = req.user?.sub
  if (!uid) return res.status(401).json({ message: 'Unauthorized' })
  const { name, comment } = req.body || {}
  const n = sanitize(name || req.user.username || '')
  const c = sanitize(comment || '')
  if (!c) return res.status(400).json({ message: 'Comment is required' })
  if (c.length > 1000) return res.status(400).json({ message: 'Comment exceeds 1000 characters' })
  if (!n) return res.status(400).json({ message: 'Name is required' })
  const doc = await Review.create({ user: uid, name: n, comment: c })
  res.status(201).json({ review: doc })
}

export const updateReview = async (req, res) => {
  const uid = req.user?.sub
  if (!uid) return res.status(401).json({ message: 'Unauthorized' })
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid review id' })
  const review = await Review.findById(id)
  if (!review) return res.status(404).json({ message: 'Review not found' })
  if (review.user.toString() !== String(uid)) {
    return res.status(403).json({ message: 'Not authorized' })
  }
  const { comment } = req.body || {}
  const c = sanitize(comment || '')
  if (!c) return res.status(400).json({ message: 'Comment is required' })
  if (c.length > 1000) return res.status(400).json({ message: 'Comment exceeds 1000 characters' })
  review.comment = c
  await review.save()
  res.json({ review })
}

export const deleteReview = async (req, res) => {
  const uid = req.user?.sub
  if (!uid) return res.status(401).json({ message: 'Unauthorized' })
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid review id' })
  const review = await Review.findById(id)
  if (!review) return res.status(404).json({ message: 'Review not found' })
  if (review.user.toString() !== String(uid)) {
    return res.status(403).json({ message: 'Not authorized' })
  }
  await review.deleteOne()
  res.json({ ok: true })
}

