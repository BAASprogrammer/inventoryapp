import { SERVER_URL } from '../../../shared/services/apiConfig';
import { useProducts } from '../hooks/useProducts'

export default function ProductsPage() {
  const {
    products,
    name, setName,
    price, setPrice,
    stock, setStock,
    setImageFile,
    createProduct,
    loading,
    totalPages,
    currentPage,
    setCurrentPage,
    editProduct,
    deleteProduct,
    editingId,
    setEditingId,
    saveProduct,
    deletingId,
    setDeletingId,
    setModal,
    modal
  } = useProducts()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear Producto</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre del producto"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <input
            type="file"
            onChange={e => {
              if (e.target.files && e.target.files[0]) {
                setImageFile(e.target.files[0]);
              } else {
                setImageFile(null);
              }
            }}
            placeholder="Imagen"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <input
            type="number"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            placeholder="Precio"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <input
            type="number"
            value={stock}
            onChange={e => setStock(Number(e.target.value))}
            placeholder="Stock"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={createProduct}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Crear
          </button>
          {modal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity" onClick={() => setModal(null)}>
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 text-center">
                  {['Producto Actualizado', 'Producto Eliminado', 'Producto Creado'].includes(modal.title) ? (
                    <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  ) : (
                    <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{modal.title}</h3>
                  <p className="text-gray-500 mb-6">{modal.message}</p>
                  <button
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm shadow-violet-600/20"
                    onClick={() => setModal(null)}
                  >
                    Entendido
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Productos</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No hay productos disponibles</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="w-full mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
                  {editingId === product.id && <button className="w-24 px-3 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 cursor-pointer" onClick={() => setEditingId(null)}>Cancelar</button>}
                </div>
                <div className="space-y-2">
                  <div className="w-full">
                    {editingId === product.id ? (
                      <input
                        type="file"
                        onChange={e => {
                          if (e.target.files && e.target.files[0]) {
                            setImageFile(e.target.files[0]);
                          } else {
                            setImageFile(null);
                          }
                        }}
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-full"
                      />
                    ) : (
                      product.image && <img src={`${SERVER_URL}${product.image}`} alt={product.name} className="w-full h-full object-cover max-h-[300px]" />
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Precio</span>
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="font-medium text-gray-800">{product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Stock</span>
                    {editingId === product.id ? (
                      <input
                        type="number"
                        value={stock}
                        onChange={e => setStock(Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                      />
                    ) : (
                      <span className={`font-medium ${product.stock > 10 ? 'text-emerald-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                        {product.stock} {product.stock === 1 ? 'unidad' : 'unidades'}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {editingId === product.id ? (
                      <button className="w-full flex justify-center text-white bg-violet-600 hover:bg-violet-700 px-2 py-2 rounded-lg cursor-pointer transition-colors" onClick={() => saveProduct(product.id)} title="Guardar">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      </button>
                    ) : (
                      <button className="w-full flex justify-center text-white bg-violet-600 hover:bg-violet-700 px-2 py-2 rounded-lg cursor-pointer transition-colors" onClick={() => editProduct(product.id)} title="Editar Producto">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                    )}
                    <button className="w-full flex justify-center text-white bg-red-600 hover:bg-red-700 px-2 py-2 rounded-lg cursor-pointer transition-colors" onClick={() => setDeletingId(product.id)} title="Eliminar Producto">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                    {deletingId === product.id && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-opacity cursor-default" onClick={() => setDeletingId(null)}>
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
                          <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-red-100">
                              <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Eliminar producto</h3>
                            <p className="text-gray-500 mb-6 text-sm">
                              ¿Estás seguro que deseas eliminar <strong>"{product.name}"</strong>? Esta acción no se puede deshacer.
                            </p>
                            <div className="flex items-center justify-center gap-3">
                              <button
                                className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                                onClick={() => setDeletingId(null)}
                              >
                                Cancelar
                              </button>
                              <button
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-sm shadow-red-600/20"
                                onClick={() => deleteProduct(product.id)}
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                type="button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Anterior
              </button>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors cursor-pointer ${page === currentPage
                      ? 'bg-violet-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
