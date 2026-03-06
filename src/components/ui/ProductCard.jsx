import { useState } from 'react'
import eyeIcon from '../../assets/icons/eye.svg'
import ProductDetail from './productDetail'

export default function ProductCard({ product, onAddToCart }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      {open && <ProductDetail product={product} onClose={() => setOpen(false)} />}

      <div className='relative bg-gray-100 p-6'>
        <button
          onClick={() => setOpen(true)}
          className='absolute top-2 left-2 z-10 h-8 w-8 p-0 bg-white rounded-full flex items-center justify-center'
        >
          <img src={eyeIcon} alt='Ver producto' className='absolute h-6 w-6 block' />
        </button>

        <img
          src={product.imageUrl}
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/600x400?text=Sin+imagen'
          }}
          alt={product.name}
          className='w-full object-cover'
        />

        <button
          type='button'
          className='absolute bottom-2 left-1/2 -translate-x-1/2 h-8 w-8 bg-white flex items-center justify-center'
          onClick={onAddToCart}
        >
          +
        </button>
      </div>

      <div className='mt-4 flex w-full justify-between'>
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
    </div>
  )
}
