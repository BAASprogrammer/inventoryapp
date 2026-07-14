import { useCustomers } from "../hooks/useCustomers"

export default function CustomersPage() {
  const {
    customers, setCustomers,
    name, setName,
    email, setEmail,
    phone, setPhone,
    editingId, setEditingId,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    confirmDelete,
    loading,
    modal, setModal,
  } = useCustomers()

  return (
    <div className="max-w-5xl mx-auto p-6">
      {modal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{modal.title}</h2>
            <p className="text-gray-600">{modal.message}</p>
            {modal.type === "confirm" ? (
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => confirmDelete(modal.id)}
                  className="mt-4 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg"
                >
                  Aceptar
                </button>
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
                >
                  Aceptar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear cliente</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <input
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Teléfono"
            className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={createCustomer}
            className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Crear
          </button>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">Clientes</h2>

      {
        loading ? (
          <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay clientes registrados</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="text-right px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3.5">
                      {editingId === customer.id ? (
                        <input
                          type="text"
                          value={customer.name}
                          onChange={e => setCustomers(customers.map(c => c.id === customer.id ? { ...c, name: e.target.value } : c))}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-800">{customer.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5">
                      {editingId === customer.id ? (
                        <input
                          type="email"
                          value={customer.email}
                          onChange={e => setCustomers(customers.map(c => c.id === customer.id ? { ...c, email: e.target.value } : c))}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-sm text-gray-600">{customer.email}</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5">
                      {editingId === customer.id ? (
                        <input
                          type="tel"
                          value={customer.phone}
                          onChange={e => setCustomers(customers.map(c => c.id === customer.id ? { ...c, phone: e.target.value } : c))}
                          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                      ) : (
                        <span className="text-sm text-gray-600">{customer.phone}</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingId === customer.id ? (
                          <button
                            type="button"
                            onClick={() => updateCustomer(customer)}
                            className="px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                          >
                            Guardar
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setEditingId(customer.id)}
                            className="px-3 py-1.5 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors cursor-pointer"
                          >
                            Editar
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => deleteCustomer(customer)}
                          className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div >
  )
}
