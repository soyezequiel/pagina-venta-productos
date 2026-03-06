export default function Cart({ open, onClose, products = [], totalToPay, onRemoveOne }) {
  if (!open) return null

  return (
    <div className='fixed inset-0 z-50' role='dialog' aria-modal='true' aria-labelledby='cart-title'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />

      <aside className='absolute right-0 top-0 h-full w-full max-w-md border-l border-zinc-200 bg-white text-zinc-800 shadow-2xl'>
        <div className='flex items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-4 py-4'>
          <h2 id='cart-title' className='text-lg font-semibold text-zinc-900'>
            Carrito
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='rounded-full border border-zinc-300 bg-white px-3 py-1 text-sm text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900'
          >
            Cerrar
          </button>
        </div>

        <div className='h-[calc(100%-64px)] overflow-y-auto px-4 py-4'>
          {products.length === 0 ? (
            <p className='text-sm text-zinc-600'>Tu carrito esta vacio.</p>
          ) : (
            <ul className='space-y-2'>
              {products.map((item) => (
                <li
                  key={item.id}
                  className='rounded-lg border border-zinc-200 bg-zinc-100/80 px-3 py-2 text-sm text-zinc-800'
                >
                  {item.name} - ${item.price} - Cantidad: {item.cantidad}
                  <button
                    className='ml-2 rounded border border-zinc-300 px-2 py-1 text-xs hover:bg-zinc-200'
                    onClick={() => onRemoveOne(item.id)}
                  >
                    Quitar 1
                  </button>
                </li>
              ))}
              {totalToPay}
            </ul>
          )}
        </div>
      </aside>
    </div>
  )
}
