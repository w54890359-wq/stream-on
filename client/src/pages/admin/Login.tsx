import { useState } from 'react'
import { useLocation } from 'wouter'
import { login } from '../../lib/api'

export default function AdminLogin() {
  const [, navigate] = useLocation()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.username, form.password)
      navigate('/admin')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Credenciales incorrectas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0F172A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: '#1E293B',
        borderRadius: 20,
        padding: '48px 40px',
        border: '1px solid #334155',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56,
            background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <svg width="22" height="26" viewBox="0 0 14 16" fill="none">
              <path d="M2 1L13 8L2 15V1Z" fill="white" />
            </svg>
          </div>
          <h1 style={{
            fontSize: 24, fontWeight: 800,
            background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            marginBottom: 4,
          }}>
            Panel Admin
          </h1>
          <p style={{ color: '#64748B', fontSize: 14 }}>Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>
              Usuario
            </label>
            <input
              className="admin-input"
              type="text"
              placeholder="streamon001"
              value={form.username}
              onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
              required
            />
          </div>

          <div>
            <label style={{ color: '#94A3B8', fontSize: 13, fontWeight: 500, marginBottom: 6, display: 'block' }}>
              Contraseña
            </label>
            <input
              className="admin-input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)',
              borderRadius: 8, padding: '10px 14px', color: '#FCA5A5', fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ marginTop: 8, padding: '13px', fontSize: 15, borderRadius: 10 }}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
