
import { useState } from 'react'
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
  password: z
    .string()
   
})

function Login({ onSwitch, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async (event) => {
    event.preventDefault()

    const validation = loginSchema.safeParse({ email, password })

    if (!validation.success) {
      const fieldErrors = {}

      validation.error.issues.forEach((issue) => {
        const field = issue.path[0]
        fieldErrors[field] = issue.message
      })

      setErrors(fieldErrors)
      setMessage('Please correct the highlighted fields.')
      return
    }

    setErrors({})

    try {
      const response = await fetch(
        'https://sample-e-1.onrender.com/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: validation.data.email,
            password: validation.data.password,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setMessage('Login successful!')

        localStorage.setItem('token', data.token)

        setEmail('')
        setPassword('')

        if (onLogin) {
          onLogin(data)
        }
      } else {
        setMessage(data.message || 'Login failed')
      }
    } catch (error) {
      console.error(error)
      setMessage('Server error. Please try again.')
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Welcome back</h1>
        <p>Sign in to continue to your account.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) {
                  setErrors((prev) => ({ ...prev, email: '' }))
                }
              }}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) {
                  setErrors((prev) => ({ ...prev, password: '' }))
                }
              }}
              placeholder="Enter your password"
              aria-invalid={Boolean(errors.password)}
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </label>

          <button type="submit">Log In</button>
        </form>

        {message && <p className="login-message">{message}</p>}
        <p className="switch-text">
          Don’t have an account?{' '}
          <button type="button" className="switch-link" onClick={onSwitch}>
            Sign up
          </button>
        </p>
      </section>
    </main>
  )
}

export default Login