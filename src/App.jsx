import { useState } from 'react'
import './App.css'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
import Addproduct from './Pages/Addproduct.jsx'

function App() {
  const [view, setView] = useState('login')

  return (
    <div className="App">
      {view === 'home' ? (
        <Home onAddProduct={() => setView('addproduct')} />
      ) : view === 'login' ? (
        <Login onSwitch={() => setView('signup')} onLogin={() => setView('home')} />
      ) : view === 'addproduct' ? (
        <Addproduct onBack={() => setView('home')} />
      ) : (
        <Signup onSwitch={() => setView('login')} />
      )}
    </div>
  )
}

export default App

