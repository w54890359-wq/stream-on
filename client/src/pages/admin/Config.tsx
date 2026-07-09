import { useEffect, useState } from 'react'
import { getConfig, updateConfig, type Config } from '../../lib/api'

export default function AdminConfig() {
  const [form, setForm] = useState<Partial<Config>>({
    siteName: 'STREAM-ON', whatsappNumber: '', heroMessage: '',
  })
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    getConfig().then(cfg => {
      if (cfg) setForm({ siteName: cfg.siteName, whatsappNumber: cfg.whatsappNumber, heroMessage: cfg.heroMessage })
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSaved(false)
    try {
      await updateConfig(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ color: 'white', fontSize: 28, fontWeight: 800, marginBottom: 32 }}>Configuración</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="admin-card" style={{ borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Site name */}
          <div>
            <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>
              Nombre del sitio
            </label>
            <input
              className="admin-input"
              value={form.siteName || ''}
              onChange={e => setForm(f => ({ ...f, siteName: e.target.value }))}
              placeholder="STREAM-ON"
            />
          </div>

          {/* WhatsApp number */}
          <div>
            <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>
              Número de WhatsApp
            </label>
            <div style={{
              background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)',
              borderRadius: 8, padding: '10px 14px', marginBottom: 10,
              fontSize: 12, color: '#FCD34D', lineHeight: 1.6,
            }}>
              ⚠️ <strong>Formato correcto:</strong> Código de país + número, SIN espacios ni símbolos.<br/>
              Ejemplo Venezuela: <code>584141234567</code> | México: <code>5214444289648</code><br/>
              NO pongas: +52, (444), guiones, ni espacios.
            </div>
            <input
              className="admin-input"
              value={form.whatsappNumber || ''}
              onChange={e => setForm(f => ({ ...f, whatsappNumber: e.target.value }))}
              placeholder="ej: 584141234567"
            />
          </div>

          {/* Hero message */}
          <div>
            <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>
              Mensaje principal del sitio
            </label>
            <textarea
              className="admin-input"
              rows={3}
              value={form.heroMessage || ''}
              onChange={e => setForm(f => ({ ...f, heroMessage: e.target.value }))}
              placeholder="Con los mejores precios del mercado. Somos de confianza, somos los mejores."
            />
            <p style={{ color: '#64748B', fontSize: 12, marginTop: 4 }}>
              Este mensaje aparece en la parte principal del sitio web.
            </p>
          </div>
        </div>

        {saved && (
          <div style={{
            background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)',
            borderRadius: 8, padding: '10px 14px', color: '#4ADE80', fontSize: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Configuración guardada exitosamente
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={loading}
          style={{ padding: '13px 28px', fontSize: 15, alignSelf: 'flex-start' }}>
          {loading ? 'Guardando...' : 'Guardar configuración'}
        </button>
      </form>
    </div>
  )
}
