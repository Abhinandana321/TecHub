import { useState } from 'react'

function Signup({ onSwitch }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name || !email || !password) {
      setMessage('Please fill in all fields.')
      return
    }
    setMessage(`Account created for ${name}`)
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Create account</h1>
        <p>Sign up and start using the app today.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </label>

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
              placeholder="Choose a password"
              required
            />
          </label>

          <button type="submit">Sign Up</button>
        </form>

        {message && <p className="login-message">{message}</p>}
        <p className="switch-text">
          Already have an account?{' '}
          <button type="button" className="switch-link" onClick={onSwitch}>
            Log in
          </button>
        </p>
      </section>
    </main>
  )
}

export default Signup