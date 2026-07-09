import { useEffect, useRef, useState } from 'react'
    import { useLocation, useParams } from 'wouter'
    import { createProduct, updateProduct, getAdminProducts, type Product } from '../../lib/api'

    const ACCOUNT_DURATION_OPTIONS = ['1 mes', '2 meses', '3 meses', '6 meses', '12 meses', 'Vitalicio']

    export default function AddEditProduct() {
    const { id } = useParams<{ id: string }>()
    const [, navigate] = useLocation()
    const isEdit = !!id

    const [form, setForm] = useState({
      name: '',
      service: '',
      type: 'cuenta_completa' as 'cuenta_completa' | 'perfil',
      price: '',
      accountDuration: '1 mes',
      guaranteeDuration: '30 días',
      features: '',
      whatsappMessage: '',
    })
    const [imageBase64, setImageBase64] = useState<string | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const fileRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (isEdit) {
        getAdminProducts().then(products => {
          const p = products.find(x => x.id === parseInt(id!))
          if (!p) return
          setForm({
            name: p.name,
            service: p.service,
            type: p.type,
            price: String(p.price),
            accountDuration: p.accountDuration || '1 mes',
            guaranteeDuration: p.guaranteeDuration || '30 días',
            features: p.features.join('\n'),
            whatsappMessage: p.whatsappMessage,
          })
          if (p.imageBase64) setImagePreview(p.imageBase64)
        })
      }
    }, [id])

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = ev => {
        const result = ev.target?.result as string
        setImageBase64(result)
        setImagePreview(result)
      }
      reader.readAsDataURL(file)
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setSaving(true)
      setError('')
      try {
        const data: Partial<Product> = {
          name: form.name,
          service: form.service,
          type: form.type,
          price: parseFloat(form.price) || 0,
          accountDuration: form.accountDuration,
          guaranteeDuration: form.guaranteeDuration,
          features: form.features.split('\n').map(f => f.trim()).filter(Boolean),
          whatsappMessage: form.whatsappMessage,
          ...(imageBase64 ? { imageBase64 } : {}),
        }
        if (isEdit) {
          await updateProduct(parseInt(id!), data)
        } else {
          await createProduct(data)
        }
        navigate('/admin/products')
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Error al guardar')
      } finally {
        setSaving(false)
      }
    }

    const labelStyle = { fontSize: 13, fontWeight: 600, color: '#94A3B8', marginBottom: 6, display: 'block' }
    const inputStyle = { background: '#0F172A', border: '1px solid #334155', color: '#F1F5F9', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 14, outline: 'none' }
    const selectStyle = { ...inputStyle, cursor: 'pointer' }

    return (
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', marginBottom: 24 }}>
          {isEdit ? 'Editar producto' : 'Agregar producto'}
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          {/* Nombre */}
          <div>
            <label style={labelStyle}>Nombre del producto *</label>
            <input style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Ej: Netflix Premium" />
          </div>

          {/* Servicio */}
          <div>
            <label style={labelStyle}>Servicio / Plataforma</label>
            <input style={inputStyle} value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} placeholder="Ej: Netflix, Disney+, HBO Max..." />
          </div>

          {/* Tipo y Precio */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Tipo de cuenta</label>
              <select style={selectStyle} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'cuenta_completa' | 'perfil' }))}>
                <option value="cuenta_completa">Cuenta completa</option>
                <option value="perfil">Perfil</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Precio ($) *</label>
              <input style={inputStyle} type="number" step="0.01" min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required placeholder="0.00" />
            </div>
          </div>

          {/* Tiempo de cuenta y Garantía */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={labelStyle}>Tiempo de la cuenta</label>
              <select style={selectStyle} value={form.accountDuration} onChange={e => setForm(f => ({ ...f, accountDuration: e.target.value }))}>
                {ACCOUNT_DURATION_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Tiempo de garantía</label>
              <input style={inputStyle} value={form.guaranteeDuration} onChange={e => setForm(f => ({ ...f, guaranteeDuration: e.target.value }))} placeholder="Ej: 30 días, 1 mes..." />
            </div>
          </div>

          {/* Características */}
          <div>
            <label style={labelStyle}>Características (una por línea)</label>
            <textarea
              style={{ ...inputStyle, minHeight: 100, resize: 'vertical', fontFamily: 'inherit' }}
              value={form.features}
              onChange={e => setForm(f => ({ ...f, features: e.target.value }))}
              placeholder="Pantallas en HD\nSin anuncios\nAcceso completo..."
            />
          </div>

          {/* Mensaje WhatsApp */}
          <div>
            <label style={labelStyle}>Mensaje de WhatsApp</label>
            <textarea
              style={{ ...inputStyle, minHeight: 80, resize: 'vertical', fontFamily: 'inherit' }}
              value={form.whatsappMessage}
              onChange={e => setForm(f => ({ ...f, whatsappMessage: e.target.value }))}
              placeholder="Hola! Me interesa el plan Netflix Premium..."
            />
          </div>

          {/* Imagen */}
          <div>
            <label style={labelStyle}>Imagen del producto</label>
            {imagePreview && (
              <div style={{ marginBottom: 10 }}>
                <img src={imagePreview} alt="preview" style={{ maxHeight: 120, borderRadius: 8, border: '1px solid #334155' }} />
              </div>
            )}
            <button type="button" onClick={() => fileRef.current?.click()}
              style={{ background: '#1E293B', border: '1px dashed #475569', color: '#94A3B8', borderRadius: 8, padding: '10px 20px', cursor: 'pointer', fontSize: 14 }}>
              {imagePreview ? 'Cambiar imagen' : 'Subir imagen'}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
          </div>

          {error && <p style={{ color: '#F87171', fontSize: 13 }}>{error}</p>}

          <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
            <button type="submit" disabled={saving}
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', color: 'white', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Guardando...' : isEdit ? 'Guardar cambios' : 'Agregar producto'}
            </button>
            <button type="button" onClick={() => navigate('/admin/products')}
              style={{ background: '#1E293B', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, padding: '12px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    )
    }
    