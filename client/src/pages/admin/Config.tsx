import { useEffect, useState } from 'react'
    import { getConfig, updateConfig } from '../../lib/api'

    export default function AdminConfig() {
    const [form, setForm] = useState({ siteName: '', whatsappNumber: '', heroMessage: '' })
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
      getConfig().then(cfg => setForm({
        siteName: cfg.siteName || 'STREAM-ON',
        whatsappNumber: cfg.whatsappNumber || '',
        heroMessage: cfg.heroMessage || 'Con los mejores precios del mercado. Somos de confianza, somos los mejores.',
      }))
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      setSaving(true)
      await updateConfig(form)
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }

    const labelStyle = { fontSize: 13, fontWeight: 600 as const, color: '#94A3B8', marginBottom: 6, display: 'block' as const }
    const inputStyle = { background: '#0F172A', border: '1px solid #334155', color: '#F1F5F9', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 14, outline: 'none', fontFamily: 'inherit' }

    return (
      <div style={{ maxWidth: 560, margin: '0 auto', padding: '24px 16px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', marginBottom: 24 }}>Configuración</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

          <div>
            <label style={labelStyle}>Nombre del sitio</label>
            <input style={inputStyle} value={form.siteName} onChange={e => setForm(f => ({ ...f, siteName: e.target.value }))} placeholder="STREAM-ON" />
          </div>

          <div>
            <label style={labelStyle}>Número de WhatsApp (con código de país, sin +)</label>
            <input style={inputStyle} value={form.whatsappNumber} onChange={e => setForm(f => ({ ...f, whatsappNumber: e.target.value }))} placeholder="5491112345678" />
            <p style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Este número se usa en Contacto y en todos los botones de los productos.</p>
          </div>

          <div>
            <label style={labelStyle}>Mensaje de bienvenida (Hero)</label>
            <textarea
              style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }}
              value={form.heroMessage}
              onChange={e => setForm(f => ({ ...f, heroMessage: e.target.value }))}
              placeholder="Con los mejores precios del mercado. Somos de confianza, somos los mejores."
            />
            <p style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Este mensaje aparece debajo del logo en la portada.</p>
          </div>

          {saved && (
            <div style={{ background: '#064e3b', color: '#6ee7b7', borderRadius: 8, padding: '10px 16px', fontSize: 14, fontWeight: 600 }}>
              Configuración guardada correctamente
            </div>
          )}

          <button type="submit" disabled={saving}
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)', color: 'white', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1, alignSelf: 'flex-start' }}>
            {saving ? 'Guardando...' : 'Guardar configuración'}
          </button>
        </form>
      </div>
    )
    }
    