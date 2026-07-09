const BASE = '/api'

    export interface Product {
    id: number
    name: string
    service: string
    type: 'cuenta_completa' | 'perfil'
    price: number
    accountDuration: string
    guaranteeDuration: string
    features: string[]
    whatsappMessage: string
    imageBase64: string | null
    active: boolean
    createdAt: string
    }

    export interface Config {
    id: number
    siteName: string
    whatsappNumber: string
    heroMessage: string
    }

    async function req(url: string, opts?: RequestInit) {
    const r = await fetch(BASE + url, { credentials: 'include', ...opts })
    if (!r.ok && r.status !== 204) {
      const err = await r.json().catch(() => ({ error: 'Error del servidor' }))
      throw new Error(err.error || 'Error')
    }
    if (r.status === 204) return null
    return r.json()
    }

    export const getProducts = (): Promise<Product[]> => req('/products')
    export const getConfig = (): Promise<Config> => req('/config')
    export const getMe = () => req('/auth/me')
    export const login = (username: string, password: string) =>
    req('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    export const logout = () => req('/auth/logout', { method: 'POST' })

    export const getAdminProducts = (): Promise<Product[]> => req('/admin/products')
    export const createProduct = (data: Partial<Product>) =>
    req('/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    export const updateProduct = (id: number, data: Partial<Product>) =>
    req(`/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    export const deleteProduct = (id: number) =>
    req(`/admin/products/${id}`, { method: 'DELETE' })
    export const toggleProduct = (id: number) =>
    req(`/admin/products/${id}/toggle`, { method: 'PATCH' })
    export const updateConfig = (data: Partial<Config>) =>
    req('/admin/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    