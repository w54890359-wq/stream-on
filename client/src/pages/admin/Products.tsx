import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { getAdminProducts, deleteProduct, toggleProduct, type Product } from '../../lib/api'

export default function AdminProducts() {
  const [, navigate] = useLocation()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    getAdminProducts().then(setProducts).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`¿Eliminar "${name}"?`)) return
    await deleteProduct(id)
    load()
  }

  const handleToggle = async (id: number) => {
    await toggleProduct(id)
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <h1 style={{ color: 'white', fontSize: 28, fontWeight: 800 }}>Mis Productos</h1>
        <button
          onClick={() => navigate('/admin/products/new')}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Agregar
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: '#64748B' }}>Cargando...</div>
      ) : products.length === 0 ? (
        <div className="admin-card" style={{ borderRadius: 12, padding: 60, textAlign: 'center', color: '#64748B' }}>
          <p>No hay productos aún. ¡Agrega el primero!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {products.map(p => (
            <div
              key={p.id}
              className="admin-card"
              style={{
                borderRadius: 12, padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
              }}
            >
              {/* Image */}
              <div style={{
                width: 52, height: 52, borderRadius: 8,
                background: '#0F172A', overflow: 'hidden', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {p.imageBase64 ? (
                  <img src={p.imageBase64} alt={p.service} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
                ) : (
                  <svg width="20" height="24" viewBox="0 0 14 16" fill="none">
                    <path d="M2 1L13 8L2 15V1Z" fill="#8B5CF6" />
                  </svg>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <p style={{ color: 'white', fontWeight: 600, fontSize: 15 }}>{p.name}</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  <span style={{ color: '#94A3B8', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: p.type === 'cuenta_completa' ? '#8B5CF6' : '#00C2FF',
                      display: 'inline-block',
                    }} />
                    {p.type === 'cuenta_completa' ? 'Cuenta completa' : 'Perfil'}
                  </span>
                  <span style={{ color: '#94A3B8', fontSize: 13 }}>
                    {p.accountDuration}
                  </span>
                  <span style={{
                    color: p.active ? '#4ADE80' : '#F87171', fontSize: 13,
                    fontWeight: 600,
                  }}>
                    {p.active ? '● Activo' : '● Inactivo'}
                  </span>
                </div>
              </div>

              {/* Price */}
              <span style={{ color: 'white', fontWeight: 700, fontSize: 18, marginRight: 8 }}>
                ${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}
              </span>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => handleToggle(p.id)}
                  className={p.active ? 'btn-danger' : 'btn-success'}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  {p.active ? 'Desactivar' : 'Activar'}
                </button>
                <button
                  onClick={() => navigate(`/admin/products/${p.id}/edit`)}
                  className="btn-edit"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(p.id, p.name)}
                  className="btn-danger"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
