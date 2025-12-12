import { useState, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getReviews, deleteReview } from '@/api/reviews'
import AddReviewForm from '@/components/AddReviewForm'
import EditReviewModal from '@/components/EditReviewModal'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import Header from '@/components/layout/Header'

const Reviews = () => {
  const { user, token } = useAuth()
  const { toast } = useToast()
  const qc = useQueryClient()
  const [editing, setEditing] = useState(null)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => getReviews(),
  })

  const reviews = useMemo(() => data?.reviews || [], [data])

  const onDelete = async (id) => {
    try {
      await deleteReview(id, token)
      toast({ title: 'Review deleted' })
      await qc.invalidateQueries({ queryKey: ['reviews'] })
    } catch (err) {
      toast({ title: err.message || 'Failed to delete review' })
    }
  }

  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: ['reviews'] })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 md:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-4">Reviews</h1>
      {user && (
        <div className="mb-6">
          <AddReviewForm onAdded={refresh} />
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {!isLoading && reviews.length === 0 && (
        <p className="text-muted-foreground">No reviews yet. Be the first to add one!</p>
      )}
      <div className="space-y-4">
        {reviews.map((r) => {
          const isOwner = user?.id && r.user && String(user.id) === String(r.user)
          return (
            <div key={r._id} className="border rounded-md p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(r.createdAt).toLocaleString()}</p>
                </div>
                {isOwner && (
                  <div className="flex gap-2">                    <Button variant="outline" size="sm" onClick={() => setEditing(r)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => onDelete(r._id)}>Delete</Button>
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm">{r.comment}</p>
            </div>
          )
        })}
      </div>

      {editing && (
        <EditReviewModal
          review={editing}
          onClose={() => setEditing(null)}
          onSaved={refresh}
        />
      )}
        </div>
      </main>
    </div>
  )
}

export default Reviews
