import { useState } from 'react'
import ProductDetail from './productDetail'
import cart from '../../assets/icons/Shopping-cart.png'
export default function ProductCard({ product, onAddToCart }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {open && <ProductDetail product={product} onClose={() => setOpen(false)} onAddToCart={() => onAddToCart(product)} />}
      <div className="transition-transform  duration-200  ease-out  hover:scale-105">
        <div className='relative bg-gray-100 p-6'>
          <img
            src={product.imageUrl}
            onClick={() => setOpen(true)}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/600x400?text=Sin+imagen'
            }}
            alt={product.name}
            className='w-full object-cover rounded-3xl'
          />
          <button
            type='button'
            className='absolute bottom-2 left-1/2 -translate-x-1/2 h-10 w-10 bg-white flex items-center justify-center rounded-2xl transition-all duration-150 active:scale-95'
            onClick={onAddToCart}
          >
            <img src={cart} className='p-2 transition-transform  duration-200  ease-out  hover:scale-115'></img>
          </button>
        </div>
        <div className='mt-4 flex w-full justify-between'>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </div>
      </div>
    </div>
  )
}
