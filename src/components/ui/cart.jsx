export default function Cart({ open, onClose, products = [], totalToPay, onRemoveOne }) {
  if (!open) return null
  return (
    <div className='fixed inset-0 z-50' role='dialog' aria-modal='true' aria-labelledby='cart-title'>
      <div className='absolute inset-0 bg-black/40' onClick={onClose} />
      <aside className='absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-hidden border-l border-zinc-200 bg-white text-zinc-800 shadow-2xl'>
        <header className='flex items-center justify-between border-b border-zinc-200 bg-zinc-50/80 px-4 py-4'>
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
        </header>
        <div className='flex-1 overflow-y-auto px-4 py-4'>
          {products.length === 0 ? (
            <div className='flex h-full items-center justify-center'>
              <div className='w-full rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-8 text-center'>
                <p className='text-base font-medium text-zinc-800'>Tu carrito esta vacio.</p>
                <p className='mt-2 text-sm text-zinc-500'>Agrega productos para ver el resumen aca.</p>
              </div>
            </div>
          ) : (
            <ul className='space-y-3'>
              {products.map((item) => (
                <li
                  key={item.id}
                  className='rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-800'
                >
                  <div className='flex items-start justify-between gap-3'>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate font-medium text-zinc-900'>{item.name}</p>
                      <p className='mt-1 text-sm text-zinc-500'>
                        Cantidad: {item.cantidad} - ${item.price} c/u
                      </p>
                    </div>
                    <button
                      type='button'
                      className='shrink-0 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900'
                      onClick={() => onRemoveOne(item.id)}
                    >
                      Quitar 1
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <footer className='flex items-center justify-between border-t border-zinc-200 bg-zinc-50/80 px-4 py-4'>
          <p className='text-sm font-medium text-zinc-600'>Precio total</p>
          <p className='text-lg font-semibold text-zinc-900'>${totalToPay}</p>
        </footer>
      </aside>
    </div>
  )
}
