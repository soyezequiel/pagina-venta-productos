import ProductCard from '../ui/ProductCard'

export default function ProductGridSection({
  products,
  onAddToCart,
  sentinelRef,
  isFetching,
  isAutoLoadCooldown,
  finished
}) {
  return (
    <section>
      <h2 className='text-3xl font-bold tracking-wide mb-10 flex justify-start'>Productos</h2>

      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
        {products.length === 0 ? (
          <p className='text-center text-gray-500 col-span-full'>No se encontraron productos</p>
        ) : (
          products.map((item) => (
            <ProductCard
              key={item.id}
              name={item.name}
              product={item}
              onAddToCart={() => onAddToCart(item)}
            />
          ))
        )}
      </div>

      <div ref={sentinelRef} className='h-8' />
      {isAutoLoadCooldown && !isFetching && !finished && (
        <p className='text-sm text-zinc-500'>Pausa breve antes de cargar mas productos...</p>
      )}
      {isFetching && <p>Cargando mas...</p>}
      {finished && <p>No hay mas productos</p>}
    </section>
  )
}
