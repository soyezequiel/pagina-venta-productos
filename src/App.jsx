import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import Cart from './components/ui/cart'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import ProductGridSection from './components/sections/ProductGridSection'
import { getProductsPage } from './services/productsApi'

function App() {
  const CART_KEY = 'catalog_cart_v1'
  const PAGE_SIZE = 8

  const [query, setQuery] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY)
      if (!raw) return []
      const data = JSON.parse(raw)
      return Array.isArray(data) ? data : []
    } catch {
      return []
    }
  })
  const [isCartOpen, setIsCartOpen] = useState(false)

  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [isFetching, setIsFetching] = useState(false)
  const [finished, setFinished] = useState(false)

  const sentinelRef = useRef(null)
  const seenIdsRef = useRef(new Set())
  const observerLockRef = useRef(false)
  const requestIdRef = useRef(0)
  const isFetchingRef = useRef(false)
  const finishedRef = useRef(false)

  useEffect(() => {
    if (cartItems.length === 0) {
      localStorage.removeItem(CART_KEY)
      return
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  useEffect(() => {
    isFetchingRef.current = isFetching
  }, [isFetching])

  useEffect(() => {
    finishedRef.current = finished
  }, [finished])

  const loadPage = useCallback(async (pageToLoad, replace = false) => {
    if (!replace && (isFetchingRef.current || finishedRef.current)) return

    isFetchingRef.current = true
    setIsFetching(true)
    setError(null)
    const requestId = ++requestIdRef.current

    try {
      const cleanTitle = query.trim() === '' ? null : query.trim()
      const cleanMin = minPrice === '' ? null : Number(minPrice)
      const cleanMax = maxPrice === '' ? null : Number(maxPrice)

      const items = await getProductsPage(
        pageToLoad,
        PAGE_SIZE,
        cleanTitle,
        cleanMin,
        cleanMax
      )

      if (requestId !== requestIdRef.current) return

      if (items.length === 0) {
        if (replace) setProducts([])
        finishedRef.current = true
        setFinished(true)
        return
      }

      if (replace) {
        seenIdsRef.current = new Set(items.map((p) => p.id))
        setProducts(items)
      } else {
        const nuevo = items.filter((p) => !seenIdsRef.current.has(p.id))
        nuevo.forEach((p) => seenIdsRef.current.add(p.id))
        setProducts((prev) => [...prev, ...nuevo])
      }

      setPage(pageToLoad + 1)
      if (items.length < PAGE_SIZE) {
        finishedRef.current = true
        setFinished(true)
      }
    } catch (err) {
      if (requestId !== requestIdRef.current) return
      setError(err.message || 'No se pudieron cargar productos')
      console.error('Error al cargar productos:', err)
    } finally {
      if (requestId === requestIdRef.current) {
        isFetchingRef.current = false
        setIsFetching(false)
      }
    }
  }, [query, minPrice, maxPrice])

  const loadNexPage = useCallback(async () => {
    await loadPage(page, false)
  }, [loadPage, page])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      observerLockRef.current = true
      seenIdsRef.current = new Set()
      setProducts([])
      finishedRef.current = false
      setFinished(false)
      setPage(1)

      try {
        await loadPage(1, true)
      } finally {
        if (!cancelled) observerLockRef.current = false
      }
    }

    run()

    return () => {
      cancelled = true
      observerLockRef.current = false
    }
  }, [query, minPrice, maxPrice, loadPage])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting) return
        if (isFetching || finished || observerLockRef.current) return

        observerLockRef.current = true

        loadNexPage()
          .catch((err) => {
            setError(err.message || 'No se pudieron cargar productos')
            console.error('Error al cargar la siguiente página:', err)
          })
          .finally(() => {
            observerLockRef.current = false
          })
      },
      { root: null, rootMargin: '300px', threshold: 0 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [loadNexPage, isFetching, finished])

  function handleAddToCart(product) {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id)
      if (existingIndex === -1) {
        return [...prev, { id: product.id, name: product.name, price: product.price, cantidad: 1 }]
      }
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    })
  }

  function handleRemoveOneFromCart(productId) {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== productId) return [item]
        if (item.cantidad > 1) return [{ ...item, cantidad: item.cantidad - 1 }]
        return []
      })
    )
  }

  const cartCounter = cartItems.reduce(
    (acc, item) => acc + Number(item.cantidad || 0),
    0
  )

  const totalToPay = cartItems.reduce(
    (acc, item) => acc + Number(item.cantidad || 0) * item.price,
    0
  )

  return (
    <div className='min-h-screen flex flex-col bg-[#f4f4f4]'>
      {isCartOpen && (
        <Cart
          open={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          products={cartItems}
          totalToPay={totalToPay}
          onRemoveOne={handleRemoveOneFromCart}
        />
      )}

      <Header
        query={query}
        onQueryChange={setQuery}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        cartCount={cartCounter}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className='flex-1 max-w-6xl mx-auto w-full px-4 py-10'>
        {isFetching ? <p>Cargando...</p> : null}
        {error ? <p className='text-red-500 text-center'>Error</p> : null}
        <ProductGridSection
          products={products}
          onAddToCart={handleAddToCart}
          sentinelRef={sentinelRef}
          isFetching={isFetching}
          finished={finished}
        />
      </main>

      <Footer />
    </div>
  )
}

export default App
