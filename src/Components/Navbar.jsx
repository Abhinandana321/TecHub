function Navbar({ onAddProduct }) {
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
        <button type="button" className="nav-button" onClick={onAddProduct}>
          Add Product
        </button>
      </nav>
    </header>
  )
}

export default Navbar