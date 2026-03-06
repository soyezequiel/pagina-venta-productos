import logoNoTextIcon from '../../assets/icons/logo-no-text.png'

export default function Footer() {
  const footerGroups = [
    {
      title: 'Redes',
      links: [
        { label: 'LinkedIn', href: 'https://example.com/linkedin' },
        { label: 'GitHub', href: 'https://example.com/github' },
        { label: 'Otros', href: 'https://example.com/otros' },
      ],
    },
    {
      title: 'Informacion',
      links: [
        { label: 'Metodos de pago', href: 'https://example.com/metodos-de-pago' },
        { label: 'Proveedor', href: 'https://example.com/proveedor' },
        { label: 'Contacto', href: 'https://example.com/contacto' },
      ],
    },
  ]

  return (
    <footer className='w-full bg-zinc-200 text-zinc-600'>
      <div className='min-h-[78vh] max-w-6xl mx-auto px-10 pt-24 pb-16 grid grid-cols-[38%_62%]'>
        <div className='flex flex-col justify-center gap-16'>
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className='text-xs tracking-widest uppercase text-zinc-500 mb-6'>{group.title}</p>
              <ul className='space-y-1 text-2xl uppercase'>
                {group.links.map((link, index) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target='_blank'
                      rel='noreferrer'
                      className='transition-colors duration-150 hover:text-zinc-900 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:text-zinc-900'
                    >
                      {link.label}
                    </a>{' '}
                    {index < group.links.length - 1 ? <span className='text-zinc-400'>/</span> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
