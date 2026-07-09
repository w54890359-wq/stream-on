import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'wouter'
import { getMe, logout } from '../../lib/api'

interface LayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: LayoutProps) {
  const [location, navigate] = useLocation()

  useEffect(() => {
    getMe().catch(() => navigate('/admin/login'))
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const navItem = (label: string, path: string, icon: ReactNode) => {
    const active = location === path || (path === '/admin/products' && location === '/admin')
    return (
      <button
        onClick={() => navigate(path)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '11px 16px',
          background: active ? 'rgba(139,92,246,0.15)' : 'none',
          border: active ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
          borderRadius: 10, cursor: 'pointer',
          color: active ? '#A78BFA' : '#94A3B8',
          fontWeight: active ? 600 : 400, fontSize: 14,
          textAlign: 'left', transition: 'all 0.15s',
        }}
      >
        {icon}
        {label}
      </button>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0F172A' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0,
        background: '#1E293B',
        borderRight: '1px solid #334155',
        display: 'flex', flexDirection: 'column',
        padding: '24px 16px',
        position: 'sticky', top: 0, height: '100vh',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, paddingLeft: 4 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
            borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="14" viewBox="0 0 14 16" fill="none">
              <path d="M2 1L13 8L2 15V1Z" fill="white" />
            </svg>
          </div>
          <span style={{
            fontWeight: 800, fontSize: 16,
            background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            STREAM-ON
          </span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {navItem('Productos', '/admin/products', (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
          ))}
          {navItem('Agregar Producto', '/admin/products/new', (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
              <line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
          ))}
          {navItem('Configuración', '/admin/config', (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
          ))}

          <div style={{ borderTop: '1px solid #334155', marginTop: 'auto', paddingTop: 16 }}>
            <button
              onClick={() => navigate('/')}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '11px 16px',
                background: 'none', border: '1px solid transparent',
                borderRadius: 10, cursor: 'pointer', color: '#64748B',
                fontSize: 14, textAlign: 'left', marginBottom: 4,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Ver sitio
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '11px 16px',
                background: 'none', border: '1px solid transparent',
                borderRadius: 10, cursor: 'pointer', color: '#64748B',
                fontSize: 14, textAlign: 'left',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Cerrar sesión
            </button>
          </div>
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  )
}
