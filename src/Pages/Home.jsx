import Navbar from '../Components/Navbar.jsx'
import Footer from '../Components/Footer.jsx'
import Cards from '../Components/Cards.jsx'

function Home({ onAddProduct }) {
  return (
    <div className="home-layout">
      <Navbar onAddProduct={onAddProduct} />

      <main className="home-page">
        <section className="product-grid">
          <Cards />
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home
