const PRIMARY = import.meta.env.VITE_API_URL_PRIMARY
const FALLBACK2 = import.meta.env.VITE_API_URL_FALLBACK2

const ENDPOINT = '/products'
const ENDPOINT_FALLBACK2 = '/shop/products/all'

const BLOCKED_HOSTNAMES = ['alta.ge', 'placeimg.com', 'placehold.co']
const PLACEHOLDER = 'https://placehold.co/600x400?text=Sin+imagen'

const mapperPrimary = (p) => ({
  id: p.id,
  name: p.title,
  price: p.price,
  imageUrl: pickImage(p),
  description: p.description
})

const mapperFallback2 = (p) => ({
  id: p._id,
  name: p.title,
  price: p.price.current,
  imageUrl: pickImage(p),
  description: p.description
})

function isAllowedImageUrl(url) {
  if (!url || typeof url !== 'string') return false
  try {
    const u = new URL(url)
    return ['http:', 'https:'].includes(u.protocol) && !BLOCKED_HOSTNAMES.includes(u.hostname)
  } catch {
    return false
  }
}

function pickImage(product) {
  const candidates = [product?.thumbnail, ...(product?.images || [])]
  return candidates.find(isAllowedImageUrl) || PLACEHOLDER
}

async function fetchProductFrom(base, endpoint, mapper, signal) {
  const res = await fetch(`${base}${endpoint}`, { signal })
  if (!res.ok) throw new Error('Error al cargar los productos')

  const raw = await res.json()
  const list = Array.isArray(raw) ? raw : raw.products

  if (!Array.isArray(list)) throw new Error('Formato de datos no reconocido')
  return list.map((p) => mapper(p))
}

function createEndpoint(endpoint, page = 1, pageSize = 8, title = null, min = null, max = null) {
  const params = []

  if (title != null && title !== '') {
    params.push(`title=${encodeURIComponent(title)}`)
  }
  if (min != null) {
    params.push(`price_min=${min}`)
  }
  if (max != null) {
    params.push(`price_max=${max}`)
  }

  const offset = (page - 1) * pageSize
  params.push(`offset=${offset}`)
  params.push(`limit=${pageSize}`)

  return `${endpoint}?${params.join('&')}`
}

export async function getProductsPage(page = 1, pageSize = 8, title = null, min = null, max = null, signal) {
  const endpoint = createEndpoint(ENDPOINT, page, pageSize, title, min, max)

  try {
    return await fetchProductFrom(PRIMARY, endpoint, mapperPrimary, signal)
  } catch (error) {
    const fallbackEndpoint = `${ENDPOINT_FALLBACK2}?page_index=${page}&page_size=${pageSize}`
    console.warn('Primary API failed, usando fallback', error.message)
    return await fetchProductFrom(FALLBACK2, fallbackEndpoint, mapperFallback2, signal)
  }
}

