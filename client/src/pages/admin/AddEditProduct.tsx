import { useEffect, useRef, useState } from 'react'
import { useLocation, useParams } from 'wouter'
import { createProduct, updateProduct, getAdminProducts, type Product } from '../../lib/api'

const DURATIONS = ['1 mes', '2 meses', '3 meses', '6 meses', '1 año', '2 años']

const empty = {
  name: '', service: '', type: 'cuenta_completa' as const,
  price: 0, accountDuration: '1 mes', guaranteeDays: 30,
  features: '', whatsappMessage: '', imageBase64: null as string | null, active: true,
}

export default function AddEditProduct() {
  const params = useParams<{ id?: string }>()
  const [, navigate] = useLocation()
  const isEdit = Boolean(params.id)
  const [form, setForm] = useState(empty)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEdit && params.id) {
      getAdminProducts().then(prods => {
        const p = prods.find(x => x.id === parseInt(params.id!))
        if (p) {
          setForm({
            name: p.name, service: p.service, type: p.type,
            price: p.price, accountDuration: p.accountDuration,
            guaranteeDays: p.guaranteeDays,
            features: p.features.join('\n'),
            whatsappMessage: p.whatsappMessage,
            imageBase64: p.imageBase64,
            active: p.active,
          })
          if (p.imageBase64) setPreview(p.imageBase64)
        }
      })
    }
  }, [params.id])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError('La imagen debe ser menor a 5MB'); return }
    const reader = new FileReader()
    reader.onload = ev => {
      const b64 = ev.target?.result as string
      setForm(f => ({ ...f, imageBase64: b64 }))
      setPreview(b64)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data: Partial<Product> = {
        ...form,
        features: (form.features as unknown as string).split('\n').map(s => s.trim()).filter(Boolean),
        price: parseFloat(form.price as unknown as string),
        guaranteeDays: parseInt(form.guaranteeDays as unknown as string, 10),
      }
      if (isEdit && params.id) {
        await updateProduct(parseInt(params.id), data)
      } else {
        await createProduct(data)
      }
      navigate('/admin/products')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setLoading(false)
    }
  }

  const field = (label: string, node: React.ReactNode, note?: string) => (
    <div>
      <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>{label}</label>
      {node}
      {note && <p style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>{note}</p>}
    </div>
  )

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
        <button onClick={() => navigate('/admin/products')} style={{
          background: '#1E293B', border: '1px solid #334155', borderRadius: 8,
          padding: '8px 12px', cursor: 'pointer', color: '#94A3B8',
          display: 'flex', alignItems: 'center', gap: 6, fontSize: 14,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5m7-7-7 7 7 7"/>
          </svg>
          Volver
        </button>
        <h1 style={{ color: 'white', fontSize: 26, fontWeight: 800 }}>
          {isEdit ? 'Editar Producto' : 'Agregar Producto'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {field('Nombre del producto *',
            <input className="admin-input" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="ej: Netflix Premium 4K" required />
          )}
          {field('Servicio',
            <input className="admin-input" value={form.service}
              onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
              placeholder="ej: Netflix, HBO Max" />
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {field('Tipo de cuenta',
            <select className="admin-input" value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value as 'cuenta_completa' | 'perfil' }))}
              style={{ cursor: 'pointer' }}>
              <option value="cuenta_completa">Cuenta Completa</option>
              <option value="perfil">Perfil</option>
            </select>
          )}
          {field('Precio (USD) *',
            <input className="admin-input" type="number" step="0.01" min="0"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))}
              placeholder="ej: 9.99" required />
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {field('Tiempo de la cuenta *',
            <select className="admin-input" value={form.accountDuration}
              onChange={e => setForm(f => ({ ...f, accountDuration: e.target.value }))}
              style={{ cursor: 'pointer' }}>
              {DURATIONS.map(d => <option key={d} value={d}>{d}</option>)}
              <option value="otro">Otro...</option>
            </select>
          )}
          {field('Días de garantía',
            <input className="admin-input" type="number" min="0"
              value={form.guaranteeDays}
              onChange={e => setForm(f => ({ ...f, guaranteeDays: parseInt(e.target.value) || 0 }))}
              placeholder="30" />
          )}
        </div>

        {field('Lo que incluye (uno por línea)',
          <textarea className="admin-input" rows={5}
            value={form.features as unknown as string}
            onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
            placeholder={'Acceso completo al correo\nFull stock\nSin restricciones'} />
        )}

        {field('Mensaje de WhatsApp *',
          <textarea className="admin-input" rows={3}
            value={form.whatsappMessage}
            onChange={e => setForm(f => ({ ...f, whatsappMessage: e.target.value }))}
            placeholder="Hola, vengo de tu sitio web, me interesa comprar..." />,
          '⚠️ Escribe SOLO el texto del mensaje. El número se configura en Configuración.'
        )}

        {/* Image upload */}
        <div>
          <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>
            Imagen del servicio
          </label>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                width: 120, height: 80, border: '2px dashed #334155',
                borderRadius: 10, cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: '#0F172A', overflow: 'hidden', flexShrink: 0,
              }}
            >
              {preview ? (
                <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }} />
              ) : (
                <div style={{ textAlign: 'center', color: '#475569' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 4px' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  <p style={{ fontSize: 11 }}>Subir imagen</p>
                </div>
              )}
            </div>
            <div>
              <button type="button" onClick={() => fileRef.current?.click()}
                style={{
                  background: '#1E293B', border: '1px solid #334155', borderRadius: 8,
                  padding: '9px 16px', cursor: 'pointer', color: '#94A3B8', fontSize: 13,
                }}>
                Elegir archivo
              </button>
              <p style={{ color: '#64748B', fontSize: 12, marginTop: 6 }}>PNG, JPG o WebP. Máx 5MB.</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
            borderRadius: 8, padding: '10px 14px', color: '#FCA5A5', fontSize: 13,
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
          <button type="submit" className="btn-primary" disabled={loading}
            style={{ padding: '12px 28px', fontSize: 15 }}>
            {loading ? 'Guardando...' : isEdit ? 'Actualizar producto' : 'Agregar producto'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')}
            style={{
              background: 'none', border: '1px solid #334155', borderRadius: 8,
              padding: '12px 20px', cursor: 'pointer', color: '#94A3B8', fontSize: 14,
            }}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
