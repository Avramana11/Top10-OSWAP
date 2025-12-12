import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import api from '@/lib/api'

const STATIC_LESSONS = [
  { lessonId: 'cr-1', title: 'Introduction to Secure Code Review', order: 1 },
  { lessonId: 'cr-2', title: 'SQL Injection Patterns', order: 2 },
  { lessonId: 'cr-3', title: 'XSS Detection Patterns', order: 3 },
  { lessonId: 'cr-4', title: 'Authentication & Authorization Mistakes', order: 4 },
]

const CodeReviewPath = () => {
  const { token } = useAuth()
  const [lessons, setLessons] = useState([])
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')

  const load = () => {
    setError('')
    api.getCodeReviewProgress(token)
      .then((r) => {
        setLessons(r.lessons || [])
        setProgress(r.progress || null)
        setError('')
      })
      .catch(() => {
        setLessons(STATIC_LESSONS)
        setProgress({ progressPercent: 0, completedLessons: [] })
        setError('Unable to load lessons. Check server and network status.')
      })
  }

  useEffect(() => { load() }, [token])

  const pct = progress?.progressPercent || 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Code Review Path</h1>
            <p className="text-muted-foreground">Learn to read code, spot insecure patterns, and compare vulnerable vs secure implementations.</p>
          </motion.div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="text-sm font-medium">{pct}%</div>
            </div>
            <Progress value={pct} />
          </div>

          {error && lessons.length === 0 && (
            <div className="p-4 mb-6 rounded-xl border border-destructive/30 bg-destructive/10 text-destructive text-sm flex items-center justify-between">
              <span>{error}</span>
              <Button size="sm" variant="outline" onClick={load}>Retry</Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessons.map((l, idx) => {
              const done = (progress?.completedLessons || []).includes(l.lessonId)
              return (
                <motion.div key={l.lessonId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: idx * 0.05 }}>
                  <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
                    <div className="text-xs text-muted-foreground mb-1">Lesson {l.order}</div>
                    <h3 className="text-lg font-semibold mb-2">{l.title}</h3>
                    <div className="flex items-center justify-between mt-4">
                      <Link to={`/learn/code-review/${l.lessonId}`} className="w-full">
                        <Button className="w-full" variant="outline">{done ? 'Review Lesson' : 'Start Lesson'}</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            })}
            {lessons.length === 0 && !error && (
              <div className="text-muted-foreground text-sm">No lessons available yet.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CodeReviewPath
