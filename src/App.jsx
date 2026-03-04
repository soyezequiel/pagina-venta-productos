//import { useState } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import ProductGridSection from './components/sections/ProductGridSection'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <div className='min-h-screen bg-[#f4f4f4] px-6 md:px-12 max-w-6xl mx-auto '>
      <Header/>
      <main className='flex-1 max-w-6xl mx-auto w-full px-4 py-10'>
        {/* <HeroSection/> */}
        <ProductGridSection/>
      </main>
      <Footer/>
    </div>

    
  )
}

export default App
