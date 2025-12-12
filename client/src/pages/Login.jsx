import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Eye, EyeOff } from 'lucide-react'
import Header from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Login = () => {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('signin')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const doLogin = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (!email || !password) return setError('Email and password are required')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) return setError('Invalid email')
      await login(email, password)
    } catch (err) {
      const code = err?.data?.error
      setError(code === 'invalid_credentials' ? 'Invalid credentials' : 'Sign in failed')
    }
  }

  const doRegister = async () => {
    setError('')
    try {
      if (!username || !email || !password) return setError('All fields are required')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) return setError('Invalid email')
      const userRegex = /^[a-zA-Z0-9._-]{3,32}$/
      if (!userRegex.test(username)) return setError('Invalid username')
      const strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
      if (!strong.test(password)) return setError('Weak password')
      try {
        await register(username, email, password)
      } catch (err) {
        const code = err?.data?.error
        if (code === 'username_taken') return setError('Username already taken')
        if (code === 'email_taken') return setError('Email already registered')
        if (code === 'invalid_username') return setError('Invalid username')
        if (code === 'invalid_email') return setError('Invalid email')
        if (code === 'weak_password') return setError('Weak password')
        if (code === 'invalid_input') return setError('Invalid input')
        setError('Registration failed')
        return
      }
    } catch (err) {
      setError('Registration failed')
    }
  }

  const switchMode = (m) => {
    setMode(m)
    setUsername('')
    setEmail('')
    setPassword('')
    setError('')
    setShowPassword(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto border border-border/50 rounded-lg p-6">
          <div className="flex gap-2 mb-4">
            <Button variant={mode==='signin'?'default':'outline'} size="sm" onClick={()=>switchMode('signin')}>Sign In</Button>
            <Button variant={mode==='register'?'default':'outline'} size="sm" onClick={()=>switchMode('register')}>Register</Button>
          </div>
          {mode === 'signin' ? (
            <>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <form onSubmit={doLogin} className="space-y-4">
              <div>
                  <label className="block text-sm mb-1">Email</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <div className="relative">
                  <Input type={showPassword?'text':'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                  <button type="button" aria-label="Toggle password visibility" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={()=>setShowPassword((v)=>!v)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex gap-2">
                  <Button type="submit" className="glow-primary">Sign In</Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Register</h1>
              <form onSubmit={(e)=>{e.preventDefault(); doRegister();}} className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Username</label>
                  <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <div className="relative">
                    <Input type={showPassword?'text':'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                    <button type="button" aria-label="Toggle password visibility" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={()=>setShowPassword((v)=>!v)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <div className="flex gap-2">
                  <Button type="submit" className="glow-primary">Create Account</Button>
                </div>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Login
