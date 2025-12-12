import { useState, useMemo } from 'react'
import { useAuth } from '@/context/AuthContext'
import { createReview } from '@/api/reviews'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'

const AddReviewForm = ({ onAdded }) => {
  const { token, user } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const defaultName = useMemo(() => user?.username || '', [user])

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const n = (name || defaultName || '').trim()
    const c = (comment || '').trim()
    if (!c) { setError('Comment is required'); return }
    if (c.length > 1000) { setError('Comment exceeds 1000 characters'); return }
    if (!n) { setError('Name is required'); return }
    setLoading(true)
    try {
      await createReview({ name: n, comment: c }, token)
      setComment('')
      toast({ title: 'Review added' })
      onAdded?.()
    } catch (err) {
      toast({ title: err.message || 'Failed to add review' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 p-4 border rounded-md">
      <div className="grid gap-2">
        <label className="text-sm font-medium">Name</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={defaultName || 'Your name'} />
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Comment</label>
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review" rows={4} />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post Review'}</Button>
      </div>
    </form>
  )
}

export default AddReviewForm

