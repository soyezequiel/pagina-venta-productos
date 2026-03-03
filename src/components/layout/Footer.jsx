export default function Footer() {
  return (
 <footer className="border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <p className="text-sm text-gray-600">copyright</p>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <a className="hover:text-gray-900" href="/privacidad">links ficticios</a>
          <a className="hover:text-gray-900" href="https://x.com" target="_blank" rel="noreferrer">redes sociales</a>
        </div>
      </div>
    </footer>
    )
}

