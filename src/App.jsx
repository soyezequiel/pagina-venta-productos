import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import ProductGridSection from './components/sections/ProductGridSection'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'



function App() {
const [query,setQuery]=useState("");
const [minPrice,setMinPrice]=useState("");
const [maxPrice,setMaxPrice]=useState("");

const [cartItems,setCartItems]=useState([]);


const ProductsData=[
    {id:1,imageUrl:"https://picsum.photos/400/600?6", name:"Producto 1", price: 19.99},
    {id:2,imageUrl:"https://picsum.photos/400/600?7", name:"Producto 2", price: 29.99},
    {id:3,imageUrl:"https://picsum.photos/400/600?8", name:"Producto 3", price: 39.99},
    {id:4,imageUrl:"https://picsum.photos/400/600?9", name:"Producto 4", price: 49.99},
    {id:5,imageUrl:"https://picsum.photos/400/600?10", name:"Producto 5", price: 59.99},
    {id:6,imageUrl:"https://picsum.photos/400/600?11", name:"Producto 6", price: 69.99}
];

//Gestiona el carrito
function handleAddToCart(product){
  setCartItems((prev) => [...prev, product.id]);
}
  //const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen flex flex-col bg-[#f4f4f4]'>
      <Header 
        query={query}
        onQueryChange={setQuery}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        maxPrice={maxPrice}
        onMaxPriceChange={setMaxPrice}
        cartCount={cartItems.length}
      />
      <main className='flex-1 max-w-6xl mx-auto w-full px-4 py-10'>
        {/* <HeroSection/> */}
        <ProductGridSection 
          products={ProductsData}
          onAddToCart={handleAddToCart} 
        />
      </main>
      <Footer/>
    </div>

    
  )
}

export default App
