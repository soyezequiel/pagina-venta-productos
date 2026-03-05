export default function Cart({ open, onClose, products = [] }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-800 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <h2 id="cart-title" className="text-lg font-semibold">
            Carrito
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-200 hover:bg-white/10"
          >
            Cerrar
          </button>
        </div>

        <div className="h-[calc(100%-64px)] overflow-y-auto px-4 py-4">
          {products.length === 0 ? (
            <p className="text-sm text-gray-300">Tu carrito esta vacio.</p>
          ) : (
            <ul className="space-y-2">
              {products.map((item, index) => (
                <li
                  key={`${item.id}-${index}`}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                >
                  Producto ID: {item.id } - {item.name} - ${item.price} - Cantidad: {item.cantidad}
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}
