export default function ProductDetail({ product, onClose }) {
  return (
    <div className='border fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      <div className='relative z-10 bg-white w-full max-w-lg rounded-xl p-4 shadow-2xl max-h-[85vh] overflow-hidden'>
        <header className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-bold mb-4'>{product?.name}</h2>
          <button onClick={onClose}>X</button>
        </header>

        <div className='border flex'>
          <div className='border'>
            <img src={product?.imageUrl} alt={product?.name} />
            {product?.price}
          </div>

          <div className='border'>
            <div className='border'>{product?.name}</div>
            <div className='border'>{product?.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
