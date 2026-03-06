import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import ProductGridSection from './components/sections/ProductGridSection'
import { useEffect } from 'react'
import { getProductsPage } from './services/productsApi' //getProducts,
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'
import { useCallback } from 'react'
import Cart from './components/ui/cart'


function App() {
  const [query, setQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");


  // persistencia de datos en local storage
  const CART_KEY = "catalog_cart_v1"

  //const [cartItems,setCartItems]=useState([]);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return [];

      const data = JSON.parse(raw);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
    // leer localStorage, parsear JSON, devolver [] si falla
  });

  useEffect(() => {
    // serializar cartItems y guardar en localStorage
    if (cartItems.length === 0) {
      localStorage.removeItem(CART_KEY);
      return;
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems]);

  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [finished, setFinished] = useState(false);


  const sentinelRef = useRef(null);

  const seenIdsRef = useRef(new Set());

  const [isCartOpen, setIsCartOpen] = useState(false);

  const loadNexPage = useCallback(async () => {
    if (isFetching || finished) return;
    setIsFetching(true);
    try {
      const items = await getProductsPage(page, PAGE_SIZE);
      if (items.length === 0) {
        setFinished(true);
        return;
      }
      const nuevo = items.filter((p) => !seenIdsRef.current.has(p.id))
      nuevo.forEach((p) => seenIdsRef.current.add(p.id))

      setPage(p => p + 1);
      setProducts((prev) => [...prev, ...nuevo])

    } catch (error) {
      console.error("Error al cargar productos:", error);
    } finally {
      setIsFetching(false);
    }
  }, [page, isFetching, finished, PAGE_SIZE])






  const [products, setProducts] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //Gestiona el carrito
  function handleAddToCart(product) {




    setCartItems(prev => {
      // me fijo si el producto ya esta en el carrito
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex === -1) {
        return [...prev, { id: product.id, name: product.name, price: product.price, cantidad: 1 }]
      }
      //si ya esta, aumento la cantidad en 1
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item)
    })
  }

  const didInitRef = useRef(false);
  useEffect(() => {
    console.log("version 1.0.0");
    if (didInitRef.current) return;
    didInitRef.current = true;
    loadNexPage();
  }, [loadNexPage])

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          try {
            setError(null);
            loadNexPage();
          } catch (error) {
            setError(error.message || "No se pudieron cargar productos")
            console.error("Error al cargar la siguiente página:", error);
          }

        }
      },
      { root: null, rootMargin: "300px", threshold: 0 }
    )
    observer.observe(node);
    return () => observer.disconnect()
  }, [loadNexPage])


  function handleRemoveOneFromCart(productId) {
    setCartItems(prev =>
      prev.flatMap(item => {
        if (item.id !== productId) return [item];
        if (item.cantidad > 1) return [{ ...item, cantidad: item.cantidad - 1 }];
        return []; //si es 1 lo elimina del array
      })
    )
  }


  function filterProducts(product) {
    const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
    const matchesMinPrice = minPrice === '' || product.price >= Number(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.price <= Number(maxPrice);
    return matchesQuery && matchesMinPrice && matchesMaxPrice;
  }
  const filteredProducts = products.filter(filterProducts);
  const cartCounter = cartItems.reduce((acc, item) =>
    acc + Number(item.cantidad || 0),
    0
  )

  const totalToPay = cartItems.reduce((acc, item) =>
    acc + Number(item.cantidad || 0) * item.price,
    0
  )

  return (

    <div className='min-h-screen flex flex-col bg-[#f4f4f4]'>
      {isCartOpen && <Cart open={isCartOpen} onClose={() => setIsCartOpen(false)} products={cartItems} totalToPay={totalToPay} onRemoveOne={handleRemoveOneFromCart} />}
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
        {/* <HeroSection/> */}
        {(isFetching) ? <p>Cargando...</p> : null}
        {(error) ? (<p className="text-red-500 text-center">Error</p>) : null}
        <ProductGridSection
          products={filteredProducts}
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



