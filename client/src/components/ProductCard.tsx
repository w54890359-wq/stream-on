import type { Product } from '../lib/api'

interface ProductCardProps {
  product: Product
  whatsappNumber: string
}

export default function ProductCard({ product, whatsappNumber }: ProductCardProps) {
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(product.whatsappMessage)}`

  return (
    <div
      className="card-hover"
      style={{
        background: 'white',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(139,92,246,0.08)',
        border: '1px solid rgba(139,92,246,0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Type badge */}
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
        <span className={product.type === 'cuenta_completa' ? 'badge-cuenta' : 'badge-perfil'}>
          {product.type === 'cuenta_completa' ? 'Cuenta' : 'Perfil'}
        </span>
      </div>

      {/* Image area */}
      <div style={{
        height: 140,
        background: 'linear-gradient(135deg, #F0F7FF 0%, #EDE9FE 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}>
        {product.imageBase64 ? (
          <img
            src={product.imageBase64}
            alt={product.service || product.name}
            style={{ maxHeight: 110, maxWidth: '100%', objectFit: 'contain' }}
          />
        ) : (
          <div style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #00C2FF, #8B5CF6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="32" height="36" viewBox="0 0 14 16" fill="none">
              <path d="M2 1L13 8L2 15V1Z" fill="white" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <h3 style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 4 }}>
            {product.name}
          </h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            {product.accountDuration && (
              <span style={{
                fontSize: 12,
                color: '#6B7280',
                background: '#F3F4F6',
                padding: '2px 8px',
                borderRadius: 20,
                fontWeight: 500,
              }}>
                {product.accountDuration}
              </span>
            )}
          </div>
        </div>

        {/* Guarantee */}
        <span className="badge-garantia">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          {product.guaranteeDays} días garantizados
        </span>

        {/* Features */}
        {product.features.length > 0 && (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {product.features.map((f, i) => (
              <li key={i} style={{ fontSize: 13, color: '#4B5563', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: 12 }}>✓</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Price */}
        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <p style={{ fontWeight: 900, fontSize: 26, color: '#111827', letterSpacing: '-0.5px' }}>
            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
            <span style={{ fontSize: 14, fontWeight: 500, color: '#6B7280', marginLeft: 4 }}>USD</span>
          </p>
        </div>

        {/* WhatsApp button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          Comprar por WhatsApp
        </a>
      </div>
    </div>
  )
}
