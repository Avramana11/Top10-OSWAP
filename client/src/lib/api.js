const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

const json = (method, path, body, token) => {
  return fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then(async (res) => {
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      const err = new Error('request_failed')
      err.status = res.status
      err.data = data
      throw err
    }
    return data
  })
}

export const login = (email, password) => json('POST', '/api/auth/login', { email, password })
export const register = (username, email, password) => json('POST', '/api/auth/register', { username, email, password })
export const getProfile = (token) => json('GET', '/api/profile', null, token)

export const getBeginnerProgress = (token) => json('GET', '/api/learn/beginner/progress', null, token)
export const completeBeginnerLesson = (lessonId, token) => json('POST', '/api/learn/beginner/complete', { lessonId }, token)
export const submitBeginnerQuiz = (lessonId, answers, token) => json('POST', '/api/learn/beginner/quiz', { lessonId, answers }, token)
export const getLessonContent = (lessonId, token) => json('GET', `/api/learn/beginner/lesson/${lessonId}`, null, token)
export const getQuizResult = (lessonId, token) => json('GET', `/api/learn/beginner/quiz/${lessonId}`, null, token)
export const resetProgress = (token) => json('POST', '/api/learn/beginner/reset-progress', {}, token)
export const resetQuiz = (lessonId, token) => json('POST', '/api/learn/beginner/reset-quiz', { lessonId }, token)

export const getCodeReviewProgress = (token) => json('GET', '/api/learn/code-review/progress', null, token)
export const completeCodeReviewLesson = (lessonId, token) => json('POST', '/api/learn/code-review/complete', { lessonId }, token)
export const submitCodeReviewQuiz = (lessonId, answers, token) => json('POST', '/api/learn/code-review/quiz', { lessonId, answers }, token)

export default { login, register, getProfile, getBeginnerProgress, completeBeginnerLesson, submitBeginnerQuiz, getLessonContent, getQuizResult, resetProgress, resetQuiz, getCodeReviewProgress, completeCodeReviewLesson, submitCodeReviewQuiz }
