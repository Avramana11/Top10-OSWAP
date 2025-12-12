export const isValidUsername = (username) => /^[a-zA-Z0-9._-]{3,32}$/.test(username)
export const isStrongPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))
export const sanitize = (s) => String(s).trim()
