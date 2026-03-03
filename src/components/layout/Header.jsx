export default function Header() {
  return (
  <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a className="font-semibold tracking-tight" href="/">Logo</a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <a className="hover:text-gray-900" href="#features">barra de búsqueda</a>

        </nav>

        <a
          className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold border hover:bg-gray-50"
          href="#"
        >
          contador de carrito
        </a>
      </div>
    </header>
    )
}