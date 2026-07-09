import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import type { Config } from '../lib/api'

interface HeaderProps {
  config: Config | null
}

export default function Header({ config }: HeaderProps) {
  const [, navigate] = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'white',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 rgba(0,0,0,0.06)',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
        >
          <div style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M2 1L13 8L2 15V1Z" fill="white" />
            </svg>
          </div>
          <span style={{
            fontWeight: 900,
            fontSize: 20,
            background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
          }}>
            {config?.siteName || 'STREAM-ON'}
          </span>
        </button>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <button
            onClick={() => scrollTo('productos')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, color: '#374151', fontSize: 15 }}
          >
            Productos
          </button>
          <button
            onClick={() => scrollTo('contacto')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, color: '#374151', fontSize: 15 }}
          >
            Contacto
          </button>
          <button
            onClick={() => navigate('/admin')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 15,
              background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            } as React.CSSProperties}
          >
            Admin
          </button>
        </nav>
      </div>
    </header>
  )
}
