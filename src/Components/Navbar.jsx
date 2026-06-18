function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">TecHub</div>

      <div className="navbar-search">
        <input
          type="search"
          placeholder="Search products..."
          className="search-input"
        />
      </div>

      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Contact</a>
      </nav>
    </header>
  )
}

export default Navbar