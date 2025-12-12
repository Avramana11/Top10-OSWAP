const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000'

const request = async (method, path, body, token) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const message = data?.message || 'Request failed'
    const err = new Error(message)
    err.status = res.status
    err.data = data
    throw err
  }
  return data
}

export const getReviews = () => request('GET', '/api/reviews')
export const createReview = ({ name, comment }, token) => request('POST', '/api/reviews', { name, comment }, token)
export const updateReview = (id, { comment }, token) => request('PUT', `/api/reviews/${id}`, { comment }, token)
export const deleteReview = (id, token) => request('DELETE', `/api/reviews/${id}`, null, token)

export default { getReviews, createReview, updateReview, deleteReview }

