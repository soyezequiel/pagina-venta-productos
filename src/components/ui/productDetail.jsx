export default function ProductDetail({ product, onClose }) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      role='dialog'
      aria-modal='true'
      aria-labelledby='product-detail-title'
    >
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />

      <section className='relative w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl'>
        <header className='flex items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-4 py-4'>
          <h3 className='text-sm font-medium tracking-wide text-zinc-600'>Vista rapida</h3>
          <button
            type='button'
            onClick={onClose}
            className='rounded-full border border-zinc-300 bg-white px-3 py-1 text-sm text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900'
          >
            Cerrar
          </button>
        </header>

        <div className='grid grid-cols-1 md:grid-cols-2'>
          <div className='bg-zinc-50 p-6 md:p-8'>
            <div className='overflow-hidden rounded-2xl bg-zinc-100 p-6'>
              <img
                className='h-72 w-full object-contain'
                src={product?.imageUrl}
                alt={product?.name}
              />
            </div>
          </div>

          <div className='flex flex-col justify-center gap-4 p-6 md:p-8'>
            <p className='text-xs font-medium uppercase tracking-[0.2em] text-zinc-500'>
              Producto
            </p>
            <h2 id='product-detail-title' className='text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl'>
              {product?.name}
            </h2>
            <p className='text-2xl font-semibold text-zinc-900'>${product?.price} USD</p>
            <p className='text-sm leading-6 text-zinc-600'>{product?.description}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
