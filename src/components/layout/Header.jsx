import logoIcon from '../../assets/icons/logo.png'
import carritoIcon from '../../assets/icons/carrito.png'
export default function Header() {
  return (
    <div>
      <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-4">
            {/*Buscador*/}
            <div className='h-11 w-[320px] bg-zinc-200/70 rounded-sm px-4 flex items-center gap-3'>
              <span className='text-zinc-600'>⌕</span>
              <input type="text" placeholder='Buscar productos...' className='w-full bg-transparent outline-none text-zinc-700 placeholder:text-zinc-500' />
            </div>


          </div>
          <div className="justify-self-center"><img src={logoIcon} alt="Logo" className="" /></div>


          <div className="justify-self-end flex items-center -space-x-2">
              {/* Píldora con cantidad */}
              <div className='h-11 w-20 rounded-full bg-zinc-900 text-zinc-200 flex items-center justify-center text-xl  '>
                3
              </div>
              {/* Icono de carrito */}
              <button 
                type='button'
                aria-label='Abrir carrito'
                className='h-11 w-11 rounded-full border-4 border-zinc-900 bg-white flex items-center justify-center text-zinc-900'>
                  <img src={carritoIcon} alt="Carrito" className="absolute h-9 w-9" />
              </button>
            
          </div>

      </div>
      <div>
        <div className="border-t mt-4">
          {/*Filtro*/} filtro
        </div>
        <div>
           {/*Precio*/} precios
        </div>
      </div>
    </div>
    )
}