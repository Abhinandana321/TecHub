import { useEffect, useState } from 'react'

const API_BASE_URL = 'https://sample-e-1.onrender.com'

function Cards() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product/getproducts`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch products')
        }

        const normalizedProducts = Array.isArray(data)
          ? data
          : Array.isArray(data?.value)
            ? data.value
            : []

        setProducts(normalizedProducts)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <p className="loading-text">Loading products...</p>
  }

  if (error) {
    return <p className="error-text">{error}</p>
  }

  if (products.length === 0) {
    return <p className="error-text">No products available right now.</p>
  }

  return (
    <>
      {products.map((product) => {
        const imageUrl = product.image
          ? product.image.startsWith('http')
            ? product.image
            : `${API_BASE_URL}/${product.image}`
          : 'https://via.placeholder.com/300'

        return (
          <article key={product._id} className="product-card">
            <img
              src={imageUrl}
              alt={product.name || 'Product image'}
              className="product-image"
            />
            <p className="product-tag">{product.category || 'General'}</p>
            <h2>{product.name || 'Unnamed Product'}</h2>
            <p className="product-price">₹{product.price || 0}</p>
            <p>{product.description || 'No description available.'}</p>
            <button type="button">Choose plan</button>
          </article>
        )
      })}
    </>
  )
}

export default Cards

