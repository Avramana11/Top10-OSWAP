import { useState } from 'react'
import { updateReview } from '@/api/reviews'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const EditReviewModal = ({ review, onClose, onSaved }) => {
  const { token } = useAuth()
  const { toast } = useToast()
  const [comment, setComment] = useState(review?.comment || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const c = (comment || '').trim()
    if (!c) { setError('Comment is required'); return }
    if (c.length > 1000) { setError('Comment exceeds 1000 characters'); return }
    setLoading(true)
    try {
      await updateReview(review._id, { comment: c }, token)
      toast({ title: 'Review updated' })
      onSaved?.()
      onClose?.()
    } catch (err) {
      toast({ title: err.message || 'Failed to update review' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-background w-full max-w-md rounded-md shadow-lg border">
        <div className="px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Edit Review</h2>
        </div>
        <form onSubmit={onSubmit} className="p-4 space-y-3">
          <Textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={5} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditReviewModal

