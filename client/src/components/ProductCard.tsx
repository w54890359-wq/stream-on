import type { Product } from '../lib/api'

    interface ProductCardProps {
    product: Product
    whatsappNumber: string
    }

    export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(product.whatsappMessage)}`

    return (
      <div className="card-hover" style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(139,92,246,0.10)', border: '1px solid rgba(139,92,246,0.12)', display: 'flex', flexDirection: 'column', position: 'relative' }}>

        {/* Badge tipo */}
        <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
          <span className={product.type === 'cuenta_completa' ? 'badge-cuenta' : 'badge-perfil'}>
            {product.type === 'cuenta_completa' ? 'Cuenta' : 'Perfil'}
          </span>
        </div>

        {/* Imagen */}
        <div style={{ height: 150, background: 'linear-gradient(135deg, #EDE9FE 0%, #DBEAFE 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          {product.imageBase64 ? (
            <img src={product.imageBase64} alt={product.name} style={{ maxHeight: 118, maxWidth: '100%', objectFit: 'contain' }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: 16, background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="36" viewBox="0 0 14 16" fill="none"><path d="M2 1L13 8L2 15V1Z" fill="white" /></svg>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 2 }}>{product.name}</h3>

          {/* Duración y garantía */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {product.accountDuration && (
              <span style={{ fontSize: 12, color: '#7C3AED', background: '#EDE9FE', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                {product.accountDuration}
              </span>
            )}
            {product.guaranteeDuration && (
              <span className="badge-garantia">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Garantía {product.guaranteeDuration}
              </span>
            )}
          </div>

          {/* Features */}
          {product.features.length > 0 && (
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
              {product.features.map((f, i) => (
                <li key={i} style={{ fontSize: 13, color: '#4B5563', display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  <span style={{ color: '#8B5CF6', fontWeight: 700, marginTop: 1, flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          )}

          {/* Precio */}
          <div style={{ fontSize: 26, fontWeight: 900, background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            ${product.price.toFixed(2)}
          </div>

          {/* Botón WhatsApp */}
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.553 4.118 1.522 5.851L.057 23.882l6.198-1.628A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.88 9.88 0 01-5.031-1.378l-.361-.214-3.74.981.998-3.648-.235-.374A9.868 9.868 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106c5.419 0 9.894 4.474 9.894 9.894 0 5.419-4.475 9.894-9.894 9.894z"/>
            </svg>
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    )
    }
    