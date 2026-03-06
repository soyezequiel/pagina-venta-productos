import logoNoTextIcon from '../../assets/icons/logo-no-text.png'

export default function Footer() {
  return (
    <footer className='w-full bg-zinc-200 text-zinc-600'>
      <div className='min-h-[78vh] max-w-6xl mx-auto px-10 pt-24 pb-16 grid grid-cols-[38%_62%]'>
        <div className='flex flex-col justify-center gap-16'>
          <div>
            <p className='text-xs tracking-widest uppercase text-zinc-500 mb-6'>Links</p>
            <ul className='space-y-1 text-2xl uppercase'>
              <li>Linkedin <span className='text-zinc-400'>/</span></li>
              <li>Github <span className='text-zinc-400'>/</span></li>
              <li>Otros</li>
            </ul>
          </div>

          <div>
            <p className='text-xs tracking-widest uppercase text-zinc-500 mb-6'>Languages</p>
            <ul className='space-y-1 text-2xl uppercase'>
              <li>Metodos de pagos <span className='text-zinc-400'>/</span></li>
              <li>Proveedor <span className='text-zinc-400'>/</span></li>
              <li>Contactenos</li>
            </ul>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <p className='uppercase tracking-wide text-sm mb-16'>Copyright 2025-2026</p>
          <img src={logoNoTextIcon} alt='Logo' className='w-52 opacity-95' />
        </div>
      </div>

      <div className='h-14 border-t border-zinc-300'>
        <div className='max-w-6xl mx-auto h-full px-10 flex items-center justify-between text-sm text-zinc-500' />
      </div>
    </footer>
  )
}
