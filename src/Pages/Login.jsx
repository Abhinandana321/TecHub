
import { useState } from 'react'

function Login({ onSwitch, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

 const handleSubmit = async (event) => {
  event.preventDefault()

  if (!email || !password) {
    setMessage('Please enter both email and password.')
    return
  }

  try {
    const response = await fetch(
      "https://sample-e-1.onrender.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    if (response.ok) {
      setMessage("Login successful!")

      // Save token if returned by API
      localStorage.setItem("token", data.token)

      setEmail("")
      setPassword("")

      if (onLogin) {
        onLogin(data)
      }
    } else {
      setMessage(data.message || "Login failed")
    }
  } catch (error) {
    console.error(error)
    setMessage("Server error. Please try again.")
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
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