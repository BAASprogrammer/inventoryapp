import { useState, useEffect } from 'react'
import ProductsPage from './features/products/components/Products'
import CustomersPage from './features/customers/components/Customers'

type Page = 'products' | 'customers'

function App() {
  const [page, setPage] = useState<Page>(
    window.location.pathname === '/customers' ? 'customers' : 'products'
  )

  const navigate = (p: Page) => {
    setPage(p)
    window.history.pushState({}, '', p === 'customers' ? '/customers' : '/')
  }

  useEffect(() => {
    const onPopState = () => {
      setPage(window.location.pathname === '/customers' ? 'customers' : 'products')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <span className="text-lg font-bold text-gray-800">InventoryApp</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => navigate('products')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  page === 'products'
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                Productos
              </button>
              <button
                type="button"
                onClick={() => navigate('customers')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  page === 'customers'
                    ? 'bg-violet-100 text-violet-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                Clientes
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {page === 'products' ? <ProductsPage /> : <CustomersPage />}
      </main>
    </div>
  )
}

export default App
