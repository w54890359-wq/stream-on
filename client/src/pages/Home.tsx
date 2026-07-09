import { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { getProducts, getConfig, type Product, type Config } from '../lib/api'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getProducts(), getConfig()])
      .then(([prods, cfg]) => { setProducts(prods); setConfig(cfg) })
      .finally(() => setLoading(false))
  }, [])

  const waUrl = config?.whatsappNumber
    ? `https://wa.me/${config.whatsappNumber}`
    : '#'

  return (
    <div style={{ minHeight: '100vh', background: '#F0F7FF' }}>
      <Header config={config} />

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(160deg, #ffffff 0%, #EDE9FE 50%, #DBEAFE 100%)',
        padding: '72px 24px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 320, height: 320,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60, width: 240, height: 240,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,194,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          {/* Logo image */}
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
            <img
              src="/logo.png"
              alt="STREAM-ON"
              style={{ height: 140, objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(139,92,246,0.25))' }}
            />
          </div>

          <h1 className="gradient-text" style={{
            fontSize: 'clamp(36px, 6vw, 60px)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            {config?.siteName || 'STREAM-ON'}
          </h1>

          <p style={{
            fontSize: 18,
            color: '#4B5563',
            maxWidth: 520,
            margin: '0 auto 32px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}>
            {config?.heroMessage || 'Con los mejores precios del mercado. Somos de confianza, somos los mejores.'}
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                padding: '13px 28px',
                background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
              }}
            >
              Ver productos
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '13px 28px',
                background: 'white',
                color: '#1A1A2E',
                border: '2px solid rgba(139,92,246,0.2)',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 16,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              Contáctanos
            </a>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="productos" style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: '#111827', marginBottom: 8 }}>
            Nuestros{' '}
            <span className="gradient-text">Productos</span>
          </h2>
          <p style={{ color: '#6B7280', fontSize: 16 }}>
            Elige el plan que mejor se adapta a ti
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <div style={{
              width: 48, height: 48, border: '4px solid #EDE9FE',
              borderTopColor: '#8B5CF6', borderRadius: '50%',
              animation: 'spin 0.8s linear infinite', margin: '0 auto',
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 80, color: '#9CA3AF' }}>
            <p style={{ fontSize: 18 }}>Próximamente más productos</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 24,
          }}>
            {products.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                whatsappNumber={config?.whatsappNumber || ''}
              />
            ))}
          </div>
        )}
      </section>

      {/* CONTACT */}
      <section id="contacto" style={{
        padding: '60px 24px',
        background: 'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)',
      }}>
        <div style={{
          maxWidth: 480,
          margin: '0 auto',
          background: 'white',
          borderRadius: 20,
          padding: '48px 40px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(139,92,246,0.12)',
        }}>
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #00C2FF22, #8B5CF622)',
            borderRadius: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#111827', marginBottom: 12 }}>
            ¿Tienes alguna duda?
          </h2>
          <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
            Escríbenos directamente por WhatsApp y te atendemos al instante
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
            style={{ borderRadius: 12, padding: '14px 24px', fontSize: 16 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: '#1A1A2E',
        color: '#9CA3AF',
        textAlign: 'center',
        padding: '32px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{
            width: 24, height: 24,
            background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="10" height="12" viewBox="0 0 14 16" fill="none">
              <path d="M2 1L13 8L2 15V1Z" fill="white" />
            </svg>
          </div>
          <span style={{ fontWeight: 700, color: 'white', fontSize: 16 }}>{config?.siteName || 'STREAM-ON'}</span>
        </div>
        <p style={{ fontSize: 13 }}>© {new Date().getFullYear()} {config?.siteName || 'STREAM-ON'}. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
