import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import api from '@/lib/api'
import { toast } from '@/components/ui/use-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const t = localStorage.getItem('auth_token')
    if (!t) {
      setLoading(false)
      return
    }
    setToken(t)
    api
      .getProfile(t)
      .then((r) => setUser(r.user))
      .catch(() => {
        localStorage.removeItem('auth_token')
        setToken(null)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email, password) => {
    const r = await api.login(email, password)
    localStorage.setItem('auth_token', r.token)
    setToken(r.token)
    setUser(r.user)
    navigate('/')
    toast({ title: 'Successfully signed in', description: `Welcome, ${r.user.username}` })
  }

  const register = async (username, email, password) => {
    const r = await api.register(username, email, password)
    localStorage.setItem('auth_token', r.token)
    setToken(r.token)
    setUser(r.user)
    navigate('/')
    toast({ title: 'Account created', description: 'You are now signed in' })
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    setToken(null)
    setUser(null)
    navigate('/')
    toast({ title: 'Successfully logged out' })
  }

  const value = useMemo(() => ({ token, user, loading, login, register, logout }), [token, user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export const RequireAuth = ({ children, role }) => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/" replace />
  return children
}
