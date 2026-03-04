import logoIcon from '../../assets/icons/logo.png'
import carritoIcon from '../../assets/icons/carrito.png'

        

export default function Header({query,onQueryChange,minPrice,onMinPriceChange,maxPrice,onMaxPriceChange,cartCount}) {
  return (
    <div className="pt-6">
      <div className="grid grid-cols-3 items-center rounded-3xl border border-zinc-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur">
        <div className="flex items-center gap-4">
          {/*Buscador*/}
          <div className="flex h-11 w-[320px] items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-100/80 px-4 shadow-inner focus-within:border-zinc-400">
            <span className="text-zinc-500">⌕</span>
            <input
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.tarjet.value)}
              placeholder="Buscar"
              className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="justify-self-center">
          <img src={logoIcon} alt="Logo" className="h-7 w-auto object-contain opacity-90" />
        </div>

        <div className="justify-self-end flex items-center -space-x-3">
          <div className="flex h-10 w-20 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-lg font-semibold text-zinc-100 shadow">
            {cartCount}
          </div>

          <button
            type="button"
            aria-label="Abrir carrito"
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-zinc-900 bg-white p-0 shadow-md transition hover:scale-105"
          >
            <img src={carritoIcon} alt="Carrito" className="h-7 w-7 object-contain" />
          </button>
        </div>
      </div>

      <div className="mt-10 space-y-3 rounded-2xl bg-white/70 px-4 py-5 shadow-sm">
        <p className=" text-xl font-semibold tracking-tight text-zinc-800 ">Filters(+)</p>
        <div className="flex items-center gap-4">
          <span className="text-xl font-light text-zinc-600 ">precio</span>
          <button className="rounded-full border border-zinc-300 bg-white px-4 py-1 text-xs font-medium tracking-[0.2em] text-zinc-700 transition hover:border-zinc-500">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              placeholder="Min"
              className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
            />
          </button>
          <button className="rounded-full border border-zinc-300 bg-white px-4 py-1 text-xs font-medium tracking-[0.2em] text-zinc-700 transition hover:border-zinc-500">
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              placeholder="Max"
              className="w-full bg-transparent text-sm text-zinc-700 placeholder:text-zinc-400 focus:outline-none"
            />
          </button>
        </div>
      </div>
    </div>
  )
}
